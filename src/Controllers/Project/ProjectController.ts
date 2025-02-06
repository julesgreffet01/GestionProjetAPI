import {Project} from "../../Models/BO/Project/Project";
import {ProjectDAO} from "../../Models/DAO/Project/ProjectDAO";
import { Request, Response } from 'express';

export class ProjectController {

    static async getAll(req: Request, res: Response) {
        try {
            const projects = await ProjectDAO.getAll();
            const projectsJson = projects.map((project: any) => project.toJson());
            res.status(200).json(projectsJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async forceGetAll(req: Request, res: Response) {
        try {
            const projects = await ProjectDAO.forceGetAll();
            const projectsJson = projects.map((project: any) => project.toJson());
            res.status(200).json(projectsJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const project = await ProjectDAO.find(id);
            if(!project){
                res.status(404).json({error: 'No such project'});
            } else if(project instanceof Project){
                res.status(200).json(project.toJson());
            } else{
                res.status(404).json({error: 'Erreur serveur'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur'});
        }
    }

    static async forceFind(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const project = await ProjectDAO.forceFind(id);
            if(!project){
                res.status(404).json({error: 'No such project'});
            } else if(project instanceof Project){
                res.status(200).json(project.toJson());
            } else{
                res.status(404).json({error: 'Erreur serveur'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur'});
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const {nom, desc, idCreateur} = req.body;
            if(nom && desc && idCreateur){
                const user = await ProjectDAO.find(idCreateur);
                if(!user){
                    res.status(404).json({error: 'bad User id'});
                }
                const project = new Project(0, nom, desc, false, user);
                const newProject = await ProjectDAO.create(project);
                if(!newProject){
                    res.status(404).json({error: 'probleme de create'});
                } else if (newProject instanceof Project){
                    res.status(200).json(newProject.toJson());
                } else {
                    res.status(404).json({error: 'Erreur serveur.'});
                }
            } else {
                res.status(400).json({error: 'Not all informations'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur'});
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const {nom, desc, del, idCreateur} = req.body;
            if(nom && desc && idCreateur && del){
                const user = await ProjectDAO.find(idCreateur);
                if(!user){
                    res.status(404).json({error: 'bad user id'});
                }
                const project = new Project(id, nom, desc, del, user);
                const nbRow = await ProjectDAO.update(project);
                if(!nbRow) {
                    res.status(404).json({error: 'probleme de update'});
                } else if (nbRow >= 1){
                    res.status(200).json(project.toJson());
                }
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur'});
        }
    }

    static async softDelete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const project = await ProjectDAO.find(id);
            if(!project){
                res.status(404).json({error: 'pas de projet'});
            }
            if(project instanceof Project){
                const nbRow = await ProjectDAO.softDelete(project);
                if(!nbRow) {
                    res.status(404).json({error: 'probleme de delete'});
                } else if (nbRow >= 1){
                    project.del = true;
                    res.status(200).json(project.toJson());
                }
            } else {
                res.status(404).json({error: 'probleme de delete'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur'});
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const project = await ProjectDAO.find(id);
            if(!project){
                res.status(404).json({error: 'pas de projet'});
            }
            if(project instanceof Project){
                const nbRow = await ProjectDAO.delete(project);
                if(!nbRow) {
                    res.status(404).json({error: 'probleme de delete'});
                } else if (nbRow >= 1){
                    project.del = true;
                    res.status(200).json(project.toJson());
                }
            } else {
                res.status(404).json({error: 'probleme de delete'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur'});
        }
    }
}