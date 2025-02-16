import { Request, Response, NextFunction } from 'express';
import {UserDAO} from "../Models/DAO/UserDAO";
import {ProjectDAO} from "../Models/DAO/Project/ProjectDAO";

export async function verifUserInProject(request: Request, res: Response, next: NextFunction) {
    const { taskId, userId, cardId } = request.body;
    if (!userId || (!taskId && !cardId)) {
        res.status(400).send("Bad Request: Missing parameters");
        return;
    }
    try {
        const project = taskId
            ? await ProjectDAO.getProjectByTask(taskId)
            : await ProjectDAO.getProjectByCard(cardId);

        if (!project) {
            res.status(404).send("Not Found");
            return;
        }
        const users = await UserDAO.getAllByProject(project.id);
        //@ts-ignore
        const userExists = users?.some(user => user?.id === userId) ?? false;
        if (userExists) {
            next();
        } else {
            res.status(403).send("User not authorized");
        }
    } catch (error) {
        console.error("Error in verifUserInProject:", error);
        res.status(500).send("Internal Server Error");
    }
}
