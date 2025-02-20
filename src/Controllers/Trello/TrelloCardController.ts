import { Request, Response } from 'express';
import {TrelloCardDAO} from "../../Models/DAO/Trello/TrelloCardDAO";
import {TrelloCard} from "../../Models/BO/Trello/TrelloCard";
import {TrelloListDAO} from "../../Models/DAO/Trello/TrelloListDAO";

export class TrelloCardController {

    static async getAllByListAndPosition(req: Request, res: Response) {
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

    static async getAllRealisedByTrello(req: Request, res: Response) {
        try {
            const trelloId = parseInt(req.params.trelloId);
            const cards = await TrelloCardDAO.getAllRealisedByTrello(trelloId);
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

    static async create(req: Request, res: Response) {
        try {
            const listId = parseInt(req.params.listId);
            console.log(listId);
            const {nom, desc, dateReal} = req.body;
            const list = await TrelloListDAO.find(listId);
            if(!list){
                res.status(404).json({ error: 'list not found' });
                return;
            }
            const card = new TrelloCard(0, nom, desc, dateReal, null, false, list, null);
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
            const listId = parseInt(req.params.listId);
            const {nom, desc, dateReal} = req.body;
            if(listId && nom && desc && dateReal && id){
                const list = await TrelloListDAO.find(listId);
                if(!list){
                    res.status(404).json({ error: 'list not found' });
                    return;
                }
                const card = new TrelloCard(id, nom, desc, dateReal, null, false, list, null);
                const nbRow = await TrelloCardDAO.update(card);
                if(!nbRow){
                    res.status(404).json({ error: 'probleme update' });
                } else if(nbRow >= 1){
                    res.status(200).json(card.toJson());
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
                }
            } else {
                res.status(500).json({ error: 'not all information.' });
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

    static async changeRealised(req: Request, res: Response) {
        try {
            const {real} = req.body;
            const id = parseInt(req.params.id);
            if(!id){
                res.status(404).json({ error: 'id not found' });
                return;
            }
            let card = null;
            if(real == null){
                res.status(404).json({ error: 'Not all information' });
                return;
            } else if(real){
                const {realisateurId} = req.body
                if(realisateurId == null){
                    res.status(404).json({ error: 'Not all information' });
                    return;
                }
                card = await TrelloCardDAO.changeRealised(id, real, realisateurId);
            } else {
                card = await TrelloCardDAO.changeRealised(id, real);
            }
            if(card == null){
                res.status(404).json({error: 'No such card'});
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
}