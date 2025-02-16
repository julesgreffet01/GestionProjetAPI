import { Request, Response } from 'express';
import { Trello} from "../../Models/BO/Trello/Trello";
import {TrelloDAO} from "../../Models/DAO/Trello/TrelloDAO";
import {ProjectDAO} from "../../Models/DAO/Project/ProjectDAO";

export class TrelloController {

    static async getAll(req: Request, res: Response) {
        try {
            const trellos = await TrelloDAO.getAll();
            const trellosJson = trellos.map((trello: any) => trello.toJson());
            res.status(200).json(trellosJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async forceGetAll(req: Request, res: Response) {
        try {
            const trellos = await TrelloDAO.forceGetAll();
            const trellosJson = trellos.map((trello: any) => trello.toJson());
            res.status(200).json(trellosJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async getAllByProject(req: Request, res: Response) {
        try {
            const projectId = parseInt(req.params.projectId);
            const trellos = await TrelloDAO.getAllByProject(projectId);
            const trellosJson = trellos.map((trello: any) => trello.toJson());
            res.status(200).json(trellosJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const trello = await TrelloDAO.find(id);
            if(!trello) {
                res.status(404).json({ error: 'Trello not found' });
                return;
            } else if (trello instanceof Trello) {
                res.status(200).json(trello.toJson());
                return;
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async forceFind(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const trello = await TrelloDAO.forceFind(id);
            if(!trello) {
                res.status(404).json({ error: 'Trello not found' });
                return;
            } else if (trello instanceof Trello) {
                res.status(200).json(trello.toJson());
                return;
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const {nom, projectId} = req.body;
            if(nom && projectId){
                const project = await ProjectDAO.find(projectId)
                if(!project){
                    res.status(401).json({ error: 'pas de projet' });
                    return;
                }
                const trello = new Trello(0, nom, false, project)
                const newTrello = await TrelloDAO.create(trello);
                if(newTrello instanceof Trello){
                    res.status(200).json(newTrello.toJson());
                    return;
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
                    return;
                }
            } else {
                res.status(401).json({ error: 'not all informations' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const {nom, projectId} = req.body;
            if(nom && projectId){
                const project = await ProjectDAO.find(projectId);
                if(!project){
                    res.status(401).json({ error: 'pas de projet' });
                    return;
                }
                const trello = new Trello(id, nom, false, project)
                const nbRow = await TrelloDAO.update(trello)
                if(!nbRow){
                    res.status(404).json({ error: 'Trello not found' });
                    return;
                } else if(trello instanceof Trello){
                    res.status(200).json(trello.toJson());
                    return;
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
                }
            } else {
                res.status(401).json({ error: 'not all informations' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async restore(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const newTrello = await TrelloDAO.restore(id);
            if(!newTrello){
                res.status(404).json({ error: 'Trello not found' });
            } else if (newTrello instanceof Trello ){
                res.status(200).json(newTrello.toJson());
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
            const trello = await TrelloDAO.forceFind(id);
            if(!trello) {
                res.status(404).json({ error: 'Trello not found' });
            } else if(trello instanceof Trello){
                const nbRow = await TrelloDAO.delete(trello);
                if(!nbRow){
                    res.status(404).json({ error: 'probleme de delete' });
                } else {
                    trello.del = true;
                    res.status(200).json(trello.toJson());
                }
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async softDelete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const trello = await TrelloDAO.find(id);
            if(!trello) {
                res.status(404).json({ error: 'Trello not found' });
            } else if(trello instanceof Trello){
                const nbRow = await TrelloDAO.softDelete(trello);
                if(!nbRow){
                    res.status(404).json({ error: 'probleme de delete' });
                } else {
                    trello.del = true;
                    res.status(200).json(trello.toJson());
                }
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }
}