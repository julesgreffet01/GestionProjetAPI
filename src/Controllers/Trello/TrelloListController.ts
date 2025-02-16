import { Request, Response } from 'express';
import {TrelloList} from "../../Models/BO/Trello/TrelloList";
import {TrelloListDAO} from "../../Models/DAO/Trello/TrelloListDAO";
import {TrelloDAO} from "../../Models/DAO/Trello/TrelloDAO";

export class TrelloListController {
    static async getAll(req: Request, res: Response) {
        try {
            const lists = await TrelloListDAO.getAll();
            const listJson = lists.map((list: any) => list.toJson());
            res.status(200).json(listJson);
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Erreur serveur"});
        }
    }

    static async forceGetAll(req: Request, res: Response) {
        try {
            const lists = await TrelloListDAO.forceGetAll();
            const listJson = lists.map((list: any) => list.toJson());
            res.status(200).json(listJson);
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Erreur serveur"});
        }
    }

    static async getAllByTrello(req: Request, res: Response) {
        try {
            const trelloId = parseInt(req.params.trelloId);
            const lists = await TrelloListDAO.getAllByPositionAndTrello(trelloId);
            const listJson = lists.map((list: any) => list.toJson());
            res.status(200).json(listJson);
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Erreur serveur"});
        }
    }

    static async find (req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const list = await TrelloListDAO.find(id);
            if(!list) {
                res.status(404).json({error: "list not found"});
                return;
            } else if (list instanceof TrelloList) {
                res.status(200).json(list.toJson());
            } else {
                res.status(500).json({error: "Erreur serveur"});
            }
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Erreur serveur"});
        }
    }

    static async forceFind (req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const list = await TrelloListDAO.forceFind(id);
            if(!list) {
                res.status(404).json({error: "list not found"});
                return;
            } else if (list instanceof TrelloList) {
                res.status(200).json(list.toJson());
            } else {
                res.status(500).json({error: "Erreur serveur"});
            }
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Erreur serveur"});
        }
    }

    static async create (req: Request, res: Response) {
        try  {
            const {nom, trelloId} = req.body;
            if(nom && trelloId) {
                const trello = await TrelloDAO.find(trelloId);
                if(!trello) {
                    res.status(404).json({error: "Trello not found"});
                    return;
                }
                const list = new TrelloList(0, nom, null, false, trello);
                const newList = await TrelloListDAO.create(list);
                if(newList instanceof TrelloList) {
                    res.status(200).json(newList.toJson());
                } else {
                    res.status(404).json({error: "probleme de create"});
                }
            } else {
                res.status(401).json({error: "not all infos"});
            }
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Erreur serveur"});
        }
    }

    static async update (req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const {nom, trelloId} = req.body;
            if(nom && trelloId) {
                const trello = await TrelloDAO.find(trelloId);
                if(!trello) {
                    res.status(404).json({error: "Trello not found"});
                    return;
                }
                const list = new TrelloList(id, nom, null, false, trello);
                const nbRow = await TrelloListDAO.update(list);
                if(!nbRow) {
                    res.status(404).json({error: "probleme de update"});
                } else if(nbRow >= 1){
                    res.status(200).json(list.toJson());
                } else {
                    res.status(500).json({error: "Erreur serveur"});
                }
            } else {
                res.status(401).json({error: "not all infos"});
            }
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Erreur serveur"});
        }
    }

    static async restore (req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const newList = await TrelloListDAO.restore(id);
            if(!newList){
                res.status(404).json({ error: 'Trello not found' });
            } else if (newList instanceof TrelloList ) {
                res.status(200).json(newList.toJson());
            } else {
                res.status(500).json({ error: 'Erreur serveur.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async delete (req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const list = await TrelloListDAO.forceFind(id);
            if(!list) {
                res.status(404).json({error: "list not found"});
            } else if(list instanceof TrelloList) {
                const nbRow = await TrelloListDAO.delete(list);
                if(!nbRow) {
                    res.status(404).json({error: "probleme de delete"});
                } else if (nbRow >= 1){
                    list.del = true;
                    res.status(200).json(list.toJson())
                } else {
                    res.status(500).json({error: "Erreur serveur"});
                }
            } else {
                res.status(404).json({error: "Erreur serveur"});
            }
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Erreur serveur"});
        }
    }

    static async softDelete (req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const list = await TrelloListDAO.find(id);
            if(!list) {
                res.status(404).json({error: "list not found"});
            } else if(list instanceof TrelloList) {
                const nbRow = await TrelloListDAO.softDelete(list);
                if(!nbRow) {
                    res.status(404).json({error: "probleme de delete"});
                } else if (nbRow >= 1){
                    list.del = true;
                    res.status(200).json(list.toJson())
                } else {
                    res.status(500).json({error: "Erreur serveur"});
                }
            } else {
                res.status(404).json({error: "Erreur serveur"});
            }
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Erreur serveur"});
        }
    }

    static async updatePosition (req: Request, res: Response) {
        try {
            const {position} = req.body;
            const nbRow = await TrelloListDAO.updatePosition(position);
            if(!nbRow) {
                res.status(404).json({error: "probleme de updatePosition"});
            } else {
                res.status(200).json({message: 'Position updated'});
            }
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Erreur serveur"});
        }
    }
}