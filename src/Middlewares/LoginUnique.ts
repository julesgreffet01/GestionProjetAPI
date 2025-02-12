import { Request, Response, NextFunction } from 'express';
import {UserDAO} from "../Models/DAO/UserDAO";

export async function loginUnique(req: Request, res: Response, next: NextFunction) {
    const log = req.body.log;
    try {
        const userExists = await UserDAO.logUnique(log); // Vérifie directement si le login existe
        if (userExists) {
            res.status(401).json({ message: 'Login déjà utilisé' });
            return;
        }
        next();
    } catch (error) {
        next(error);
    }
}
