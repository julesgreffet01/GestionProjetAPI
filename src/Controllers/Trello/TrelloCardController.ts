import { Request, Response } from 'express';
import {TrelloCardDAO} from "../../Models/DAO/Trello/TrelloCardDAO";
import {TrelloCard} from "../../Models/BO/Trello/TrelloCard";
import {TrelloListDAO} from "../../Models/DAO/Trello/TrelloListDAO";

export class TrelloCardController {

    static async getAll(req: Request, res: Response) {
        try {
            const cards = await TrelloCardDAO.getAll();
            const cardsJson = cards.map((card: any) => card.toJson());
            res.status(200).json(cardsJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async forceGetAll(req: Request, res: Response) {
        try {
            const cards = await TrelloCardDAO.forceGetAll();
            const cardsJson = cards.map((card: any) => card.toJson());
            res.status(200).json(cardsJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async getAllByList(req: Request, res: Response) {
        try {
            const listId = parseInt(req.params.listId);
            const cards = await TrelloCardDAO.getAllByListAndPosition(listId);
            const cardsJson = cards.map((card: any) => card.toJson());
            res.status(200).json(cardsJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const card = await TrelloCardDAO.find(id);
            if(!card){
                res.status(404).json({ error: 'card not Found' });
            } else if(card instanceof TrelloCard){
                res.status(200).json(card.toJson());
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
            const card = await TrelloCardDAO.forceFind(id);
            if(!card){
                res.status(404).json({ error: 'card not Found' });
            } else if(card instanceof TrelloCard){
                res.status(200).json(card.toJson());
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
            const {nom, desc, dateReal, listId} = req.body;
            const list = await TrelloListDAO.find(listId);
            if(!list){
                res.status(404).json({ error: 'list not found' });
                return;
            }
            const card = new TrelloCard(0, nom, desc, dateReal, null, false, list);
            const newCard = await TrelloCardDAO.create(card);
            if(newCard instanceof TrelloCard){
                res.status(200).json(newCard.toJson());
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const {nom, desc, dateReal, listId} = req.body;
            const list = await TrelloListDAO.find(listId);
            if(!list){
                res.status(404).json({ error: 'list not found' });
                return;
            }
            const card = new TrelloCard(id, nom, desc, dateReal, null, false, list);
            const nbRow = await TrelloCardDAO.update(card);
            if(!nbRow){
                res.status(404).json({ error: 'probleme update' });
            } else if(nbRow >= 1){
                res.status(200).json(card.toJson());
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async updatePosition(req: Request, res: Response) {
        try {
            const {positions} = req.body;
            const nbRow = await TrelloCardDAO.updatePosition(positions);
            if(!nbRow){
                res.status(404).json({ error: 'probleme update position' });
            } else if(nbRow.length >= 1){
                res.status(200).json({message: 'update position'});
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async restore(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const newCard = await TrelloCardDAO.restore(id);
            if(!newCard){
                res.status(404).json({ error: 'Trello not found' });
            } else if (newCard instanceof TrelloCard ){
                res.status(200).json(newCard.toJson());
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
            const card = await TrelloCardDAO.forceFind(id);
            if(!card){
                res.status(404).json({ error: 'card not found' });
            } else if(card instanceof TrelloCard){
                const nbRow = await TrelloCardDAO.delete(card);
                if(!nbRow){
                    res.status(404).json({ error: 'probleme update' });
                } else if(nbRow >= 1){
                    res.status(200).json(card.toJson());
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
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
            const card = await TrelloCardDAO.find(id);
            if(!card){
                res.status(404).json({ error: 'card not found' });
            } else if(card instanceof TrelloCard){
                const nbRow = await TrelloCardDAO.softDelete(card);
                if(!nbRow){
                    res.status(404).json({ error: 'probleme update' });
                } else if(nbRow >= 1){
                    res.status(200).json(card.toJson());
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
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