import {ProjectUser} from "../../Models/BO/Project/ProjectUser";
import {ProjectUserDAO} from "../../Models/DAO/Project/ProjectUserDAO";
import { Request, Response } from 'express';

export class ProjectUserController {

    static async getAllByUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.idUser);
            if(id){
                const ProjectUsers = await ProjectUserDAO.getAllByUser(id);
                return ProjectUsers.map(ProjectUser => ProjectUser.toJson());
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }
}