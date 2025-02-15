import { Request, Response } from 'express';
import {ToDoTaskDAO} from "../../Models/DAO/ToDo/ToDoTaskDAO";
import {ToDoTask} from "../../Models/BO/ToDo/ToDoTask";
import {ToDoDAO} from "../../Models/DAO/ToDo/ToDoDAO";


export class ToDoTaskController {


    static async getAllByOrdre(req: Request, res: Response) {
        try {
            const idTodo = parseInt(req.params.idTodo);
            const tasks = await ToDoTaskDAO.getAllByOrderByToDo(idTodo);
            const tasksJson = tasks.map((task: any)=> task.toJson());
            res.status(200).json(tasksJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur Serveur'});
        }
    }

    static async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if(!id){
                res.status(404).json({error: 'No such ID'});
                return;
            }
            const task = await ToDoTaskDAO.find(id);
            if(!task){
                res.status(404).json({error: 'No such ToDo'});
            } else if (task instanceof ToDoTask) {
                res.status(200).json(task.toJson());
            } else {
                res.status(500).json({error: 'Erreur Serveur'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur Serveur'});
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const {lib, ordre,dateReal, idTodo } = req.body;
            if(lib && ordre && idTodo && dateReal){
                const toDo = await ToDoDAO.find(idTodo);
                if(!toDo){
                    res.status(404).json({error: 'No ToDo for this id'})
                    return;
                }
                const dateParse = new Date(dateReal);
                const ordreInt = parseInt(ordre);
                const task = new ToDoTask(0, lib, ordreInt, false, false, dateParse, null, toDo, false);
                const newTask = await ToDoTaskDAO.create(task);
                if(newTask instanceof ToDoTask){
                    res.status(200).json(newTask.toJson());
                    return;
                } else {
                    res.status(500).json({error: 'Erreur Serveur'});
                }
            } else {
                res.status(404).json({error: 'Not all informations'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur Serveur'});
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if(!id){
                res.status(404).json({error: 'No such ID'});
                return;
            }
            const {lib, ordre,dateReal} = req.body;
            if(lib && ordre && dateReal){
                const task = await ToDoTaskDAO.find(id);
                if(!task){
                    res.status(404).json({error: 'No task for this id'})
                    return;
                } else if(task instanceof ToDoTask){
                    task.lib = lib;
                    task.ordre = ordre;
                    task.dateReal = dateReal;
                    const nbRow = await ToDoTaskDAO.update(task);
                    if(!nbRow){
                        res.status(500).json({error: 'Erreur update'});
                    } else if (nbRow >= 1){
                        res.status(200).json(task.toJson());
                        return;
                    } else {
                        res.status(500).json({error: 'Erreur Serveur'});
                    }
                } else {
                    res.status(500).json({error: 'Erreur Serveur'});
                }
            } else {
                res.status(404).json({error: 'Not all informations'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur Serveur'});
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if(!id){
                res.status(404).json({error: 'Invalid ID'});
                return;
            }
            const task = await ToDoTaskDAO.find(id);
            if(!task){
                res.status(404).json({error: 'Pas de todo a cet id'})
                return;
            } else if (task instanceof ToDoTask){
                const nbRow = await ToDoTaskDAO.delete(task);
                if(!nbRow){
                    res.status(404).json({error: 'No such task'});
                    return;
                } else if (nbRow >= 1){
                    task.del = true;
                    res.status(200).json(task.toJson());
                    return;
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
                    return;
                }
            } else {
                res.status(500).json({error: 'Erreur Serveur'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur Serveur'});
        }
    }

    static async realiser(req: Request, res: Response) {
        try {
            const {real} = req.body;
            const id = parseInt(req.params.id);
            if(!real){
                res.status(404).json({error: 'Not all information'});
                return;
            }
            const task = await ToDoTaskDAO.realiser(id, real);
            if(!task){
                res.status(404).json({error: 'No such task'});
            } else if(task instanceof ToDoTask){
                res.status(200).json(task.toJson());
            } else {
                res.status(500).json({error: 'Erreur Serveur'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur Serveur'});
        }
    }

    static async enCours(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { enCours } = req.body;
            if(!enCours){
                res.status(404).json({error: 'Not all informations'});
                return;
            }
            const task = await ToDoTaskDAO.enCours(id, enCours);
            if(task instanceof ToDoTask){
                res.status(200).json(task.toJson());
            } else {
                res.status(500).json({error: 'Erreur Serveur'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur Serveur'});
        }
    }

    static async updateOrder(req: Request, res: Response) {
        try {
            const {ordre} = req.body;
            if(typeof ordre === 'object' && ordre !== null) {
                const nbRows = await ToDoTaskDAO.updateOrder(ordre);
                if(!nbRows){
                    res.status(404).json({error: 'probleme update order'});
                } else if (nbRows.length > 0){
                    res.status(200).json({message: 'ok'})
                } else {
                    res.status(500).json({error: 'probleme update order'});
                }
            } else {
                res.status(404).json({error: 'Not all information'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur Serveur'});
        }
    }
}