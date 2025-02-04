import {Admin} from "../Models/BO/Admin";
import {AdminDAO} from "../Models/DAO/AdminDAO";
import { Request, Response } from 'express';

export class AdminController {

    static async authentification(req: Request, res: Response) {
        try {
            const {log, mdp} = req.body;
            if(log && mdp){
                const adminDAO = new AdminDAO();
                const admin = await adminDAO.authentification(log, mdp);
                if(!admin) {
                    res.status(404).json({message: "Admin not found"});
                } else if (admin instanceof Admin) {
                    res.status(200).json(admin.toJson());
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
                }
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

}