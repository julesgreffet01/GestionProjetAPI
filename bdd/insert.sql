INSERT INTO "Admin" (log, mdp) VALUES ('admin', 'test');

INSERT INTO "Users" (log, mdp) VALUES ('jules', 'password');
INSERT INTO "Users" (log, mdp) VALUES ('max', 'password');

INSERT INTO "Roles" (nom) VALUES ('Admin'), ('Collaborateur');

INSERT INTO "Projects" (nom, description, "idCreateur") VALUES ('test1', 'test1 desc', 1);

INSERT INTO "ProjectUser" ("idUser", "idProject", "idRole") VALUES (1, 1, 1), (2, 1, 2);