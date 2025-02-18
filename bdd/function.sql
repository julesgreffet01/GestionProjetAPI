-- ############# user ##############
CREATE OR REPLACE FUNCTION propagate_del_from_users() RETURNS trigger AS $$
BEGIN
    UPDATE "ProjectUser" SET del = TRUE WHERE "idUser" = NEW.id;

    UPDATE "ToDoTasks" SET "idRealisateur" = NULL WHERE "idRealisateur" = NEW.id;

    UPDATE "Projects" SET "idCreateur" = NULL WHERE "idCreateur" = NEW.id;

    UPDATE "ToDoTasksUsers" SET del = TRUE WHERE "idUser" = NEW.id;

    UPDATE "TrelloCardUser" SET del = TRUE WHERE "idUser" = NEW.id;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER trigger_propagate_del_users
    AFTER UPDATE OF del ON "Users"
    FOR EACH ROW
    WHEN (OLD.del = FALSE AND NEW.del = TRUE)
    EXECUTE FUNCTION propagate_del_from_users();


--restore
CREATE OR REPLACE FUNCTION restore_del_for_user_relations() RETURNS trigger AS $$
BEGIN
    UPDATE "ProjectUser" SET del = FALSE WHERE "idUser" = NEW.id AND "idProject" IN (SELECT id FROM "Projects" WHERE del = FALSE);

    UPDATE "ToDoTasksUsers" SET del = FALSE WHERE "idUser" = NEW.id AND "idTask" IN (SELECT tt.id FROM "ToDoTasks" tt
        JOIN "ToDo" t ON tt."idTodo" = t.id JOIN "Projects" p ON t."idProject" = p.id WHERE t.del = FALSE AND p.del = FALSE);

    UPDATE "TrelloCardUser" SET del = FALSE WHERE "idUser" = NEW.id AND "idCard" IN (SELECT tc.id FROM "TrelloCards" tc
         JOIN "TrelloLists" tl ON tc."idList" = tl.id JOIN "Trello" t ON tl."idTrello" = t.id JOIN "Projects" p ON t."idProj" = p.id
         WHERE tl.del = FALSE AND t.del = FALSE AND p.del = FALSE);

    UPDATE "ToDoTasks" SET "idRealisateur" = NEW.id WHERE "idRealisateur" IS NULL AND "idTodo" IN (SELECT id FROM "ToDo" WHERE del = FALSE);

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_restore_del_users
    AFTER UPDATE OF del ON "Users"
    FOR EACH ROW
    WHEN (OLD.del = TRUE AND NEW.del = FALSE)
    EXECUTE FUNCTION restore_del_for_user_relations();



-- ##################### projet #################
CREATE OR REPLACE FUNCTION propagate_del_from_projects() RETURNS trigger AS $$
BEGIN
    UPDATE "ProjectUser" SET del = TRUE WHERE "idProject" = NEW.id;

    UPDATE "ToDoTasksUsers" SET del = TRUE WHERE "idTask" IN (SELECT id FROM "ToDoTasks" WHERE "idTodo" IN (SELECT id FROM "ToDo" WHERE "idProject" = NEW.id));

    UPDATE "TrelloCardUser" SET del = TRUE WHERE "idCard" IN (SELECT id FROM "TrelloCards" WHERE "idList" IN (SELECT id FROM "TrelloLists" WHERE "idTrello" IN (SELECT id FROM "Trello" WHERE "idProj" = NEW.id)));

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER trigger_propagate_del_projects
    AFTER UPDATE OF del ON "Projects"
    FOR EACH ROW
    WHEN (OLD.del = FALSE AND NEW.del = TRUE)
    EXECUTE FUNCTION propagate_del_from_projects();



-- restore
CREATE OR REPLACE FUNCTION restore_del_for_project_relations() RETURNS trigger AS $$
    BEGIN
    UPDATE "ProjectUser" SET del = FALSE WHERE "idProject" = NEW.id AND "idUser" IN (SELECT id FROM "Users" WHERE del = FALSE);

    UPDATE "ToDoTasksUsers" SET del = FALSE WHERE "idTask" IN (SELECT id FROM "ToDoTasks" WHERE "idTodo" IN (SELECT id FROM "ToDo" WHERE "idProject" = NEW.id))
                                            AND "idUser" IN (SELECT id FROM "Users" WHERE del = FALSE);

    UPDATE "TrelloCardUser" SET del = FALSE WHERE "idCard" IN (SELECT id FROM "TrelloCards" WHERE "idList" IN (SELECT id FROM "TrelloLists" WHERE "idTrello" IN (SELECT id FROM "Trello" WHERE "idProj" = NEW.id))) AND "idUser" IN (SELECT id FROM "Users" WHERE del = FALSE);

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_restore_del_projects
    AFTER UPDATE OF del ON "Projects"
    FOR EACH ROW
    WHEN (OLD.del = TRUE AND NEW.del = FALSE)
    EXECUTE FUNCTION restore_del_for_project_relations();



--################ todolist ###########
CREATE OR REPLACE FUNCTION del_todo() RETURNS TRIGGER AS $$
BEGIN
    UPDATE "ToDoTasksUsers" SET del = TRUE WHERE "idTask" IN (SELECT id FROM "ToDoTasks" WHERE "idTodo" = NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_del_todo
    AFTER UPDATE OF del ON "ToDo"
    FOR EACH ROW
    WHEN (OLD.del = FALSE AND NEW.del = TRUE)
    EXECUTE FUNCTION del_todo();

--restore
CREATE OR REPLACE FUNCTION restore_todo() RETURNS TRIGGER AS $$
BEGIN
    UPDATE "ToDoTasksUsers" SET del = FALSE WHERE "idTask" IN (SELECT tt.id FROM "ToDoTasks" tt INNER JOIN "ToDo" t ON tt."idTodo" = t.id WHERE t.del = FALSE AND tt."idTodo" = NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_restore_todo
    AFTER UPDATE OF del ON "ToDo"
    FOR EACH ROW
    WHEN (OLD.del = TRUE AND NEW.del = FALSE)
    EXECUTE FUNCTION restore_todo();




--############ trello ############
CREATE OR REPLACE FUNCTION del_trello() RETURNS TRIGGER AS $$
BEGIN
    UPDATE "TrelloCardUser" SET del = TRUE WHERE "idCard" IN (SELECT id FROM "TrelloCards"
            WHERE "idList" IN (SELECT id FROM "TrelloLists" WHERE "idTrello" = NEW.id));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_del_trello
    AFTER UPDATE OF del ON "Trello"
    FOR EACH ROW
    WHEN (OLD.del = FALSE AND NEW.del = TRUE)
    EXECUTE FUNCTION del_trello();


--restore
CREATE OR REPLACE FUNCTION restore_del_for_trello_users() RETURNS trigger AS $$
BEGIN
    UPDATE "TrelloCardUser"
    SET del = FALSE
    WHERE "idCard" IN (
        SELECT tc.id FROM "TrelloCards" tc
                              JOIN "TrelloLists" tl ON tc."idList" = tl.id
                              JOIN "Trello" t ON tl."idTrello" = t.id
                              JOIN "Projects" p ON t."idProj" = p.id
        WHERE t.id = NEW.id
          AND tl.del = FALSE
          AND t.del = FALSE
          AND p.del = FALSE
    )
      AND "idUser" IN (
        SELECT id FROM "Users" WHERE del = FALSE
    );

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_restore_del_trello_users
    AFTER UPDATE OF del ON "Trello"
    FOR EACH ROW
    WHEN (OLD.del = TRUE AND NEW.del = FALSE)
    EXECUTE FUNCTION restore_del_for_trello_users();




--############## lists #################"
CREATE OR REPLACE FUNCTION del_trello_list() RETURNS TRIGGER AS $$
BEGIN
    UPDATE "TrelloCardUser" SET del = TRUE WHERE "idCard" IN (
        SELECT id FROM "TrelloCards" WHERE "idList" = NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_del_trello_list
    AFTER UPDATE OF del ON "TrelloLists"
    FOR EACH ROW
    WHEN (OLD.del = FALSE AND NEW.del = TRUE)
    EXECUTE FUNCTION del_trello_list();


--restore
CREATE OR REPLACE FUNCTION restore_del_for_trello_list_users() RETURNS trigger AS $$
BEGIN
    UPDATE "TrelloCardUser"
    SET del = FALSE
    WHERE "idCard" IN (
        SELECT tc.id FROM "TrelloCards" tc
                              JOIN "TrelloLists" tl ON tc."idList" = tl.id
                              JOIN "Trello" t ON tl."idTrello" = t.id
                              JOIN "Projects" p ON t."idProj" = p.id
        WHERE tl.id = NEW.id
          AND t.del = FALSE
          AND p.del = FALSE
    )
      AND "idUser" IN (
        SELECT id FROM "Users" WHERE del = FALSE
    );

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_restore_del_trello_list_users
    AFTER UPDATE OF del ON "TrelloLists"
    FOR EACH ROW
    WHEN (OLD.del = TRUE AND NEW.del = FALSE)
    EXECUTE FUNCTION restore_del_for_trello_list_users();



--############ positions ###############
CREATE OR REPLACE FUNCTION set_default_position_cards()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.position IS NULL OR NEW.position = 0 THEN
        NEW.position := COALESCE((SELECT MAX(position) FROM "TrelloCards" WHERE "idList" = NEW."idList"), 0) + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_default_position_cards
    BEFORE INSERT ON "TrelloCards"
    FOR EACH ROW EXECUTE FUNCTION set_default_position_cards();


-- Trigger pour définir la position par défaut dans TrelloLists
CREATE OR REPLACE FUNCTION set_default_position_lists()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.position IS NULL OR NEW.position = 0 THEN
        NEW.position := COALESCE((SELECT MAX(position) FROM "TrelloLists" WHERE "idTrello" = NEW."idTrello"), 0) + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_default_position_lists
    BEFORE INSERT ON "TrelloLists"
    FOR EACH ROW EXECUTE FUNCTION set_default_position_lists();


-- Trigger pour définir l'ordre par défaut dans ToDoTasks
CREATE OR REPLACE FUNCTION set_default_ordre_tasks()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.ordre IS NULL OR NEW.ordre = 0 THEN
        NEW.ordre := COALESCE((SELECT MAX(ordre) FROM "ToDoTasks" WHERE "idTodo" = NEW."idTodo"), 0) + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_default_ordre_tasks
    BEFORE INSERT ON "ToDoTasks"
    FOR EACH ROW EXECUTE FUNCTION set_default_ordre_tasks();
