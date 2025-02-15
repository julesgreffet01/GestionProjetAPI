import { Request, Response, NextFunction } from 'express';
import {UserDAO} from "../Models/DAO/UserDAO";
import {ProjectDAO} from "../Models/DAO/Project/ProjectDAO";

export async function verifUserInProject(request: Request, res: Response, next: NextFunction) {
    const { taskId, userId } = request.body;
    if(taskId && userId){
        const project = await ProjectDAO.getProjectByTask(taskId);
        if(project){
            const users = await UserDAO.getAllByProject(project.id);
            //@ts-ignore
            const tmpUser = users.filter(user => userId !== user.id);
            if(tmpUser.length > 0){
                next();
            } else {
                res.status(403).send("User no authorized");
            }
        } else {
            res.status(404).send("Not Found");
        }
    }
}