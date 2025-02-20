import {Admin} from "../Models/BO/Admin";
import {AdminDAO} from "../Models/DAO/AdminDAO";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class AdminController {

    static async authentification(req: Request, res: Response) {
        try {
            const JWT_SECRET = "ASX2ergtH4";
            const random = Math.random();
            const {log, mdp} = req.body;
            if(log && mdp){
                const adminDAO = new AdminDAO();
                const admin = await adminDAO.authentification(log, mdp);
                if(!admin) {
                    res.status(404).json({message: "Admin not found"});
                } else if (admin instanceof Admin) {
                    const token = jwt.sign(
                        { random: random }, JWT_SECRET, { expiresIn: '1h' });
                    res.status(200).json({token: token});
                } else {
                    res.status(500).json({ error: 'Erreur serveur.' });
                }
            } else {
                res.status(401).json({message: "Not logged in"});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Erreur serveur.' });
        }
    }

}