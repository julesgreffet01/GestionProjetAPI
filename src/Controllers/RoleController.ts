import { Request, Response } from 'express';
import {Role} from "../Models/BO/Role";
import {RoleDAO} from "../Models/DAO/RoleDAO";

export class RoleController {

    static async getAll(req: Request, res: Response) {
        try {
            const roles = await RoleDAO.getAll();
            const roleJson = roles.map((role: any) => role.toJson());
            res.status(200).json(roleJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async forceGetAll(req: Request, res: Response) {
        try {
            const roles = await RoleDAO.forceGetAll();
            const roleJson = roles.map((role: any) => role.toJson());
            res.status(200).json(roleJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async forceFind(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const role = await RoleDAO.forceFind(id);
            if(!role) {
                res.status(404).json({ error: 'No such role.' });
            } else if(role instanceof Role) {
                res.status(200).json(role.toJson());
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
            const {nom} = req.body;
            const role  = new Role(0, nom, false);
            const newRole = await RoleDAO.create(role);
            if(newRole instanceof Role) {
                res.status(200).json(newRole.toJson());
            } else {
                res.status(500).json({ error: 'Erreur create.' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const {nom} = req.body;
            const role = new Role(id, nom, false);
            const nbRow = await RoleDAO.update(role);
            if(!nbRow) {
                res.status(404).json({ error: 'No such role.' });
            } else if (nbRow >= 1) {
                res.status(200).json(role.toJson());
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
            const role = await RoleDAO.find(id);
            if(!role) {
                res.status(404).json({ error: 'No such role.' });
            } else if(role instanceof Role) {
                const newRole = await RoleDAO.restore(id);
                if(!newRole){
                    res.status(404).json({ error: 'No such role.' });
                } else if(newRole instanceof Role) {
                    res.status(200).json(newRole.toJson());
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

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const role  = await RoleDAO.forceFind(id);
            if(!role) {
                res.status(404).json({ error: 'No such role.' });
            } else if(role instanceof Role) {
                const nbRow = await RoleDAO.delete(role);
                if(!nbRow) {
                    res.status(404).json({ error: 'probleme de delete.' });
                } else if(nbRow >= 1) {
                    res.status(200).json(role.toJson());
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
            const role  = await RoleDAO.find(id);
            if(!role) {
                res.status(404).json({ error: 'No such role.' });
            } else if(role instanceof Role) {
                const nbRow = await RoleDAO.softDelete(role);
                if(!nbRow) {
                    res.status(404).json({ error: 'probleme de delete.' });
                } else if(nbRow >= 1) {
                    res.status(200).json(role.toJson());
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