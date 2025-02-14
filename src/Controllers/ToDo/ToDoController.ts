import {ToDo} from "../../Models/BO/ToDo/ToDo";
import {ToDoDAO} from "../../Models/DAO/ToDo/ToDoDAO";
import {ProjectDAO} from "../../Models/DAO/Project/ProjectDAO";
import { Request, Response } from 'express';

export class ToDoController {

    static async getAll(req: Request, res: Response) {
        try {
            const toDos = await ToDoDAO.getAll();
            const toDosJson = toDos.map((todo: any)=> todo.toJson());
            res.status(200).json(toDosJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async forceGetAll(req: Request, res: Response) {
        try {
            const toDos = await ToDoDAO.forceGetAll();
            const toDosJson = toDos.map((todo: any)=> todo.toJson());
            res.status(200).json(toDosJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if(!id){
                res.status(404).json({error: 'No such id found'});
                return;
            }
            const toDo = await ToDoDAO.find(id);
            if(!toDo){
                res.status(404).json({error: 'No such ToDo found'});
                return;
            } else if (toDo instanceof ToDo){
                res.status(200).json(toDo.toJson())
                return;
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
                return;
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async forceFind(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if(!id){
                res.status(404).json({error: 'No such id found'});
                return;
            }
            const toDo = await ToDoDAO.forceFind(id);
            if(!toDo){
                res.status(404).json({error: 'No such ToDo found'});
                return;
            } else if (toDo instanceof ToDo){
                res.status(200).json(toDo.toJson())
                return;
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
                return;
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const {idProject, nom, del} = req.body;
            const project = await ProjectDAO.find(idProject);
            const toDo = new ToDo(0, nom, del, project);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }
}