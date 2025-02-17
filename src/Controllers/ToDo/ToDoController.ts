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

    static async getAllByProject(req: Request, res: Response) {
        try {
            const { projectId } = req.body;
            const toDos = await ToDoDAO.getAllByProject(projectId)
            const toDosJson = toDos.map((todo)=> todo.toJson());
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
            const {projectId, nom} = req.body;
            if(projectId && nom){
                const project = await ProjectDAO.find(projectId);
                if(!project){
                    res.status(404).json({error: 'No such project'});
                    return;
                }
                const toDo = new ToDo(0, nom, false, project);
                const newToDo = await ToDoDAO.create(toDo);
                if (newToDo instanceof ToDo){
                    res.status(200).json(newToDo.toJson());
                    return;
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
                }
            } else {
                res.status(401).json({ error: 'not all informations.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const {projectId, nom} = req.body;
            if(projectId && nom && id){
                const project = await ProjectDAO.find(projectId);
                if(!project){
                    res.status(404).json({error: 'No such project'});
                    return;
                }
                const toDo = new ToDo(id, nom, false, project);
                const nbRow = await ToDoDAO.update(toDo);
                if(!nbRow){
                    res.status(404).json({error: 'No such project'});
                    return;
                } else if (nbRow >= 1) {
                    res.status(200).json(toDo.toJson());
                    return;
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
                    return;
                }
            } else {
                res.status(404).json({ error: 'not all informations.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async softDelete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if(!id){
                res.status(404).json({error: 'Probleme d id'});
                return;
            }
            const toDo = await ToDoDAO.find(id);
            if(!toDo){
                res.status(404).json({error: 'pas de todo trouve'});
                return;
            } else if (toDo instanceof ToDo){
                const nbRow = await ToDoDAO.softDelete(toDo);
                if(!nbRow){
                    res.status(404).json({error: 'No such project'});
                    return;
                } else if (nbRow >= 1){
                    toDo.del = true;
                    res.status(200).json(toDo.toJson());
                    return;
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
                    return;
                }
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if(!id){
                res.status(404).json({error: 'Probleme d id'});
                return;
            }
            const toDo = await ToDoDAO.forceFind(id);
            if(!toDo){
                res.status(404).json({error: 'pas de todo trouve'});
                return;
            } else if (toDo instanceof ToDo){
                const nbRow = await ToDoDAO.delete(toDo);
                if(!nbRow){
                    res.status(404).json({error: 'No such project'});
                    return;
                } else if (nbRow >= 1){
                    toDo.del = true;
                    res.status(200).json(toDo.toJson());
                    return;
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
                    return;
                }
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
                return;
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async restore(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if(!id){
                res.status(404).json({error: 'Probleme d id'});
                return;
            }
            const toDo = await ToDoDAO.restore(id);
            if(!toDo){
                res.status(404).json({error: 'No such project'});
            } else if (toDo instanceof ToDo){
                res.status(200).json(toDo.toJson());
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

}