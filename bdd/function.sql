-- ############# user ##############
CREATE OR REPLACE FUNCTION propagate_del_from_users() RETURNS VOID AS $$
BEGIN
    UPDATE Projects SET del = TRUE WHERE idCreateur = NEW.id;
    UPDATE UserProject SET del = TRUE WHERE idUser = NEW.id;
    UPDATE ToDoTasks SET idRealisateur = NULL WHERE idRealisateur = NEW.id;
    UPDATE TodoUsers SET del = TRUE WHERE idUser = NEW.id;
    UPDATE CardUser SET del = TRUE WHERE idUser = NEW.id;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_propagate_del_users
    AFTER UPDATE OF del ON Users
    FOR EACH ROW
    WHEN (NEW.del = TRUE)
    EXECUTE FUNCTION propagate_del_from_users();


--restore
CREATE OR REPLACE FUNCTION restore_del_for_user_relations() RETURNS VOID AS $$
BEGIN
    UPDATE UserProject
    SET del = FALSE
    WHERE idUser = NEW.id
      AND idProject IN (SELECT id FROM Projects WHERE del = FALSE);

    UPDATE TodoUsers
    SET del = FALSE
    WHERE idUser = NEW.id
      AND idTask IN (SELECT id FROM ToDoTasks WHERE del = FALSE);

    UPDATE CardUser
    SET del = FALSE
    WHERE idUser = NEW.id
      AND idCard IN (SELECT id FROM Cards WHERE idList IN
      (SELECT id FROM Lists WHERE idTrello IN SELECT id FROM Trellos WHERE idProj IN (SELECT id FROM Projects WHERE del = FALSE)))
    );

    UPDATE ToDoTasks
    SET idRealisateur = NEW.id
    WHERE idRealisateur IS NULL
      AND idTodo IN (SELECT id FROM ToDo WHERE del = FALSE);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_restore_del_users
    AFTER UPDATE OF del ON Users
    FOR EACH ROW
    WHEN (NEW.del = FALSE)
    EXECUTE FUNCTION restore_del_for_user_relations();



-- ##################### projet #################
CREATE OR REPLACE FUNCTION propagate_del_from_projects() RETURNS VOID AS $$
BEGIN

UPDATE UserProject SET del = TRUE WHERE idProject = NEW.id;

UPDATE TodoUsers SET del = TRUE WHERE idTask IN (SELECT id FROM ToDoTasks WHERE idTodo IN (SELECT id FROM ToDo WHERE idProject = NEW.id));

UPDATE CardUser SET del = TRUE WHERE idCard IN (SELECT id FROM Cards WHERE idList IN (SELECT id FROM Lists WHERE idTrello IN (SELECT id FROM Trellos WHERE idProj = NEW.id)));
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_propagate_del_projects
    AFTER UPDATE OF del ON Projects
    FOR EACH ROW
    WHEN (NEW.del = TRUE)
    EXECUTE FUNCTION propagate_del_from_projects();



-- restore
CREATE OR REPLACE FUNCTION restore_del_for_project_relations() RETURNS VOID AS $$
BEGIN

    UPDATE UserProject
    SET del = FALSE
    WHERE idProject = NEW.id
      AND idUser IN (SELECT id FROM Users WHERE del = FALSE);

    UPDATE TodoUsers
    SET del = FALSE
    WHERE idTask IN (SELECT id FROM ToDoTasks WHERE idTodo IN (SELECT id FROM ToDo WHERE idProject = NEW.id))
      AND idUser IN (SELECT id FROM Users WHERE del = FALSE);

    UPDATE CardUser
    SET del = FALSE
    WHERE idCard IN (SELECT id FROM Cards WHERE idList IN (SELECT id FROM Lists WHERE idTrello IN (SELECT id FROM Trellos WHERE idProj = NEW.id)))
      AND idUser IN (SELECT id FROM Users WHERE del = FALSE);
END;
$$ LANGUAGE plpgsql;


