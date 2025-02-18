import { Request, Response } from 'express';
import {ToDoTaskUserDAO} from "../../Models/DAO/ToDo/ToDoTaskUserDAO";
import {ToDoTaskUser} from "../../Models/BO/ToDo/ToDoTaskUser";

export class ToDoTaskUserController {

    static async getAllByTask(req: Request, res: Response) {
        try {
            const taskId = parseInt(req.params.taskId, 10);
            const taskUsers = await ToDoTaskUserDAO.getAllByTask(taskId);
            res.json(taskUsers.map(taskUser => taskUser.toJson()));
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur'});
        }
    }


    static async create(req: Request, res: Response) {
        try {
            const taskId = parseInt(req.params.taskId, 10);
            const {userId} = req.body;
            if(taskId && userId) {
                const taskUser = new ToDoTaskUser(userId, taskId, false);
                const result = await ToDoTaskUserDAO.create(taskUser);
                if(!result) {
                    res.status(500).json({error: "erreur de create"});
                    return;
                }
                res.status(200).json(taskUser.toJson());
            } else {
                res.status(400).json({error: 'Not all information'});
                return;
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur'});
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const taskId = parseInt(req.params.taskId, 10);
            const userId= parseInt(req.params.userId, 10);
            if(taskId && userId) {
                const taskUser = new ToDoTaskUser(userId, taskId, false);
                const nbRow = await ToDoTaskUserDAO.delete(taskUser);
                if(!nbRow) {
                    res.status(404).json({error: "No such task"});
                    return;
                } else {
                    res.status(200).json(taskUser.toJson());
                    return;
                }
            } else {
                res.status(400).json({error: 'Not all information'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur'});
        }
    }
}