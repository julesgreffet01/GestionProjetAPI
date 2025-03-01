import { Request, Response } from 'express';
import {ToDoTaskDAO} from "../../Models/DAO/ToDo/ToDoTaskDAO";
import {ToDoTask} from "../../Models/BO/ToDo/ToDoTask";
import {ToDoDAO} from "../../Models/DAO/ToDo/ToDoDAO";
import {CustomRequest} from "../../Interfaces";


export class ToDoTaskController {


    static async getAllByOrdreByTodo(req: Request, res: Response) {
        try {
            const todoId = parseInt(req.params.todoId);
            const tasks = await ToDoTaskDAO.getAllByOrderByTodo(todoId);
            const tasksJson = tasks.map((task: any)=> task.toJson());
            res.status(200).json(tasksJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur Serveur'});
        }
    }

    static async getAllRealisedByTodo(req: Request, res: Response){
        try {
            const todoId = parseInt(req.params.todoId);
            const tasks = await ToDoTaskDAO.getAllRealisedByTodo(todoId);
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
            const {lib, dateReal, todoId } = req.body;
            if(lib && todoId && dateReal){
                const toDo = await ToDoDAO.find(todoId);
                if(!toDo){
                    res.status(404).json({error: 'No ToDo for this id'})
                    return;
                }
                const dateParse = new Date(dateReal);
                const task = new ToDoTask(0, lib, null, false, false, dateParse, null, toDo);
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
            const {lib,dateReal} = req.body;
            if(lib &&  dateReal){
                const task = await ToDoTaskDAO.find(id);
                if(!task){
                    res.status(404).json({error: 'No task for this id'})
                    return;
                } else if(task instanceof ToDoTask){
                    task.lib = lib;
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

    static async realiser(req: CustomRequest, res: Response) {
        try {
            const {real} = req.body;
            const id = parseInt(req.params.id);
            let task;
            if(real == null){
                res.status(404).json({error: 'Not all information'});
                return;
            } else if(real){
                const realisateurId = req.token?.id
                if(realisateurId == null){
                    res.status(404).json({ error: 'Not all information' });
                    return;
                }
                task = await ToDoTaskDAO.realiser(id, real, realisateurId);
            } else {
                 task = await ToDoTaskDAO.realiser(id, real);
            }
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
            res.status(200).json(task.toJson());
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