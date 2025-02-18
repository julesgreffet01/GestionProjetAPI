CREATE TABLE IF NOT EXISTS "Users" (
    "id" SERIAL,
    "log" VARCHAR(50) UNIQUE NOT NULL,
    "mdp" VARCHAR(250) NOT NULL,
    "del" BOOLEAN DEFAULT FALSE,
    CONSTRAINT PK_User PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "Roles" (
    "id" SERIAL,
    "nom" VARCHAR(200) UNIQUE NOT NULL,
    "del" BOOLEAN DEFAULT FALSE,
    CONSTRAINT PK_Roles PRIMARY KEY (id)
);

-- ############ administration #############
CREATE TABLE "Admin" (
    id SERIAL PRIMARY KEY,
    log VARCHAR(200),
    mdp VARCHAR(200)
);

-- ######################## projets ###########################
CREATE TABLE IF NOT EXISTS "Projects" (
    id SERIAL,
    nom VARCHAR(250),
    description VARCHAR(250),
    del BOOLEAN DEFAULT FALSE,
    "idCreateur" INTEGER,
    CONSTRAINT PK_Proj PRIMARY KEY (id),
    CONSTRAINT FK_proj FOREIGN KEY ("idCreateur") REFERENCES "Users" (id) ON DELETE CASCADE
);

-- table relation
CREATE TABLE "ProjectUser" (
    "idUser"    INTEGER NOT NULL,
    "idProject" INTEGER NOT NULL,
    "idRole"    INTEGER NOT NULL,
    del BOOLEAN DEFAULT FALSE,
    CONSTRAINT pk_user_project PRIMARY KEY ("idUser", "idProject"),
    CONSTRAINT fk_user FOREIGN KEY ("idUser") REFERENCES "Users" (id) ON DELETE CASCADE,
    CONSTRAINT fk_project FOREIGN KEY ("idProject") REFERENCES "Projects" (id) ON DELETE CASCADE,
    CONSTRAINT fk_role FOREIGN KEY ("idRole") REFERENCES "Roles" (id) ON DELETE RESTRICT
);


-- ################ to do #####################
CREATE TABLE IF NOT EXISTS "ToDo" (
    id SERIAL,
    nom VARCHAR(250),
    del BOOLEAN DEFAULT FALSE,
    "idProject" INTEGER,
    CONSTRAINT PK_Todo PRIMARY KEY (id),
    CONSTRAINT FK_Todo FOREIGN KEY ("idProject") REFERENCES "Projects" (id)
);

CREATE TABLE IF NOT EXISTS "ToDoTasks" (
    id SERIAL,
    lib TEXT,
    ordre INTEGER NOT NULL,
    "enCours" BOOLEAN DEFAULT FALSE,
    realised BOOLEAN DEFAULT FALSE,
    "dateReal" DATE,
    "idRealisateur" INTEGER,
    "idTodo" INTEGER NOT NULL,
    CONSTRAINT PK_ToDoTask PRIMARY KEY (id),
    CONSTRAINT FK_ToDoTask_1 FOREIGN KEY ("idTodo") REFERENCES "ToDo" (id) ON DELETE CASCADE,
    CONSTRAINT FK_ToDoTask_2 FOREIGN KEY ("idRealisateur") REFERENCES "Users" (id) ON DELETE SET NULL
    );


-- table relation
CREATE TABLE IF NOT EXISTS "ToDoTasksUsers" (
    "idUser" INTEGER NOT NULL,
    "idTask" INTEGER NOT NULL,
    del BOOLEAN DEFAULT FALSE,
    CONSTRAINT PK_Realisator PRIMARY KEY ("idUser", "idTask"),
    CONSTRAINT FK_Real_1 FOREIGN KEY ("idUser") REFERENCES "Users" (id) ON DELETE CASCADE,
    CONSTRAINT FK_Real_2 FOREIGN KEY ("idTask") REFERENCES "ToDoTasks" (id) ON DELETE CASCADE
);




-- ######################trello#########################
CREATE TABLE IF NOT EXISTS "Trello" (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(250) NOT NULL ,
    del BOOLEAN DEFAULT FALSE,
    "idProj" INTEGER NOT NULL,
    FOREIGN KEY ("idProj") REFERENCES "Projects" (id) ON DELETE CASCADE
);


CREATE TABLE "TrelloLists" (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    position INTEGER NOT NULL,
    del BOOLEAN DEFAULT FALSE,
    "idTrello" INTEGER NOT NULL,
    FOREIGN KEY ("idTrello") REFERENCES "Trello" (id) ON DELETE CASCADE
);


CREATE TABLE "TrelloCards" (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    description TEXT,
    "dateReal" DATE,
    position INTEGER NOT NULL,
    realised BOOLEAN DEFAULT FALSE,
    "idRealisateur" INTEGER DEFAULT NULL,
    "idList" INTEGER,
    FOREIGN KEY ("idList") REFERENCES "TrelloLists" (id) ON DELETE CASCADE,
    FOREIGN KEY ("idRealisateur") REFERENCES "Users" (id) ON DELETE SET NULL
);



-- table relation
CREATE TABLE "TrelloCardUser" (
    "idUser" INTEGER NOT NULL,
    "idCard" INTEGER NOT NULL,
    del BOOLEAN DEFAULT FALSE,
    CONSTRAINT PK_CardUser PRIMARY KEY ("idUser", "idCard"),
    CONSTRAINT FK_CU_1 FOREIGN KEY ("idUser") REFERENCES "Users" (id) ON DELETE CASCADE,
    CONSTRAINT FK_CU_2 FOREIGN KEY ("idCard") REFERENCES "TrelloCards" (id) ON DELETE CASCADE
);