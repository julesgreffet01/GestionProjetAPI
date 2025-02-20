import {Response, NextFunction } from 'express';
import {CustomRequest} from "../Interfaces";
import {ProjectDAO} from "../Models/DAO/Project/ProjectDAO";
import {Project} from "../Models/BO/Project/Project";
import {User} from "../Models/BO/User";

export async function verifCreateur(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.token?.id;
        const projectId = parseInt(req.params.projectId);
        const project = await ProjectDAO.find(projectId);
        if(!project){
            res.status(404).json({error: 'pas de projet'});
            return;
        } else if(project instanceof Project){
            const creator = project.creator;
            if(creator instanceof User){
                if(creator.id == userId){
                    next();
                } else {
                    res.status(500).send("t es pas createur");
                }
            } else {
                res.status(500).send("Internal Server Error");
            }
        } else {
            res.status(500).send("Internal Server Error");
        }

    } catch (error) {
        console.error("Error in verifCreateur :", error);
        res.status(500).send("Internal Server Error");
    }
}