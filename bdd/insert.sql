INSERT INTO "Admin" (log, mdp) VALUES ('admin', 'test');

INSERT INTO "Users" (log, mdp) VALUES ('jules', 'password');
INSERT INTO "Users" (log, mdp) VALUES ('max', 'password');

INSERT INTO "Roles" (nom) VALUES ('Admin'), ('Collaborateur');


--project

INSERT INTO "Projects" (nom, description, "idCreateur") VALUES ('test1', 'test1 desc', 1), ('test2', 'test2 desc', 2);

INSERT INTO "ProjectUser" ("idUser", "idProject", "idRole") VALUES (1, 1, 1), (2, 1, 2), (2, 2, 1);


--todolist

INSERT INTO "ToDo" (nom, "idProject") VALUES ('test ToDo', 1), ('test2 ToDo', 1);

INSERT INTO "ToDoTasks" (lib, "dateReal", "idTodo") VALUES ('test task', '2025-02-20', 1);

INSERT INTO "ToDoTasksUsers" ("idUser", "idTask") VALUES (1, 1);


--trello

INSERT INTO "Trello" (nom, "idProj") VALUES ('testTrello', 1), ('testTrello2', 2);

INSERT INTO "TrelloLists" (nom, "idTrello") VALUES ('testList', 1), ('testList2', 1);

INSERT INTO "TrelloCards" (nom, description, "dateReal", "idList") VALUES ('testCard', 'desc card', '2025-02-20', 1);

INSERT INTO "TrelloCardUser" ("idUser", "idCard") VALUES (1,1);