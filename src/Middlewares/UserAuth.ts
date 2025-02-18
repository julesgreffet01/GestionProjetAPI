import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {CustomRequest} from "../Interfaces";

const JWT_SECRET = "kdqonc77cpccd1";

export function userAuth(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token manquant.' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Token invalide ou expiré.' });
            return;
        }
        req.token = decoded;
        next();
    });
}