import {ProjectUser} from "../../Models/BO/Project/ProjectUser";
import {ProjectUserDAO} from "../../Models/DAO/Project/ProjectUserDAO";
import { Request, Response } from 'express';

export class ProjectUserController {

    static async getAllByUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.userId, 10); // Vérifie bien que le paramètre correspond à :userId dans la route
            if (isNaN(id)) {
               res.status(400).json({ error: "Invalid user ID" });
            }

            const projectUsers = await ProjectUserDAO.getAllByUser(id);
            res.json(projectUsers.map(projectUser => projectUser.toJson()));

        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Erreur serveur." });
        }
    }

    static async getAllByProj(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.projId, 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "Invalid user ID" });
                return;
            }
            const projectUsers = await ProjectUserDAO.getAllByProject(id);
            res.json(projectUsers.map(projectUser => projectUser.toJson()));
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Erreur serveur." });
        }
    }


    static async create(req: Request, res: Response) {
        try {

            const {idUser, idProject, idRole} = req.body;
            if (idUser && idProject && idRole) {
                const projectUser = new ProjectUser(idUser, idProject, idRole, false);
                const newProjectUser = await ProjectUserDAO.create(projectUser);
                if (!newProjectUser) {
                    res.status(404).json({error: 'probleme de create'});
                } else if (newProjectUser instanceof ProjectUser) {
                    res.status(200).json(newProjectUser.toJson());
                } else {
                    res.status(404).json({error: 'Erreur serveur.'});
                }
            } else {
                res.status(400).json({error: 'Not all informations'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur.'});
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId, 10);
            const projId = parseInt(req.params.projId, 10);
            const projectUser = await ProjectUserDAO.find(userId, projId);
            if(!projectUser){
                res.status(404).json({error: 'probleme de projet'});
            }
            if(projectUser instanceof ProjectUser){
                const nbRow = await ProjectUserDAO.delete(userId, projId);
                if(!nbRow) {
                    res.status(404).json({error: 'probleme de delete'});
                } else if (nbRow >= 1) {
                    projectUser.del = true;
                    res.status(200).json(projectUser.toJson());
                }
            } else {
                res.status(404).json({error: 'probleme de delete'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur.'});
        }
    }
}