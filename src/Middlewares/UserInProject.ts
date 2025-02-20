import { Request, Response, NextFunction } from 'express';
import {CustomRequest} from "../Interfaces";
import {ProjectUserDAO} from "../Models/DAO/Project/ProjectUserDAO";

export async function verifUserInProject(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const projectId = parseInt(req.params.projectId);
        const userId = req.token?.id;
        if(userId && projectId){
            const realtion = await ProjectUserDAO.find(userId, projectId);
            if(realtion){
                next();
            } else {
                res.status(404).send("Pas autorise");
            }
        } else {
            res.status(401).send("Not all informations");
        }
    } catch (error) {
        console.error("Error in verifUserInProject:", error);
        res.status(500).send("Internal Server Error");
    }
}
