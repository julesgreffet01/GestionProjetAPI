import { Request, Response } from 'express';
import {TrelloCardUserDAO} from "../../Models/DAO/Trello/TrelloCardUserDAO";
import {TrelloCardUser} from "../../Models/BO/Trello/TrelloCardUser";

export class TrelloCardUserController {
    static async getAllByCard(req: Request, res: Response) {
        try {
            const cardId = parseInt(req.params.cardId);
            if(!cardId){
                res.status(404).json({error: 'No such id card'});
                return;
            }
            const cardUser = await TrelloCardUserDAO.getAllByCard(cardId);
            const jsonCU = cardUser.map((cu: any) => cu.toJson());
            res.status(200).json(jsonCU);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const cardId = parseInt(req.params.cardId);
            const {userId} = req.body;
            const cu = new TrelloCardUser(userId, cardId, false)
            const newCU = await TrelloCardUserDAO.create(cu)
            res.status(200).json(newCU.toJson());
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const cardId = parseInt(req.params.cardId);
            const userId = parseInt(req.params.userId);
            const cu = new TrelloCardUser(userId, cardId, false);
            const nbRow = await TrelloCardUserDAO.delete(cu);
            if(!nbRow){
                res.status(404).json({error: 'probleme de delete'});
            } else if(nbRow >= 1){
                res.status(404).json(cu.toJson());
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }
}