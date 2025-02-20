import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {User} from "../Models/BO/User";
import {UserDAO} from "../Models/DAO/UserDAO";
import bcrypt from 'bcrypt';
import {CustomRequest} from "../Interfaces";

export class UserController {

    static async authenticate(req: Request, res: Response) {
        try {
            const JWT_SECRET = "kdqonc77cpccd1";
            const {log, mdp} = req.body;
            if (log && mdp) {
                const user = await UserDAO.authentification(log, mdp);
                if (!user) {
                    res.status(401).json({message: "User not found"});
                } else if (user instanceof User) {
                    const token = jwt.sign(
                        {id: user.id}, JWT_SECRET, {expiresIn: '1h'});
                    res.status(200).json({token: token});
                } else {
                    res.status(500).json({error: 'Erreur serveur.'});
                }
            } else {
                res.status(401).json({message: "Not logged in"});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur.'});
        }
    }

    static async find(req: CustomRequest, res: Response) {
        try {
            const id = req.token?.id;
            const user = await UserDAO.find(id)
            if (!user) {
                res.status(401).json({message: "User not found"});
            } else if(user instanceof User) {
                res.status(200).json(user.toJson());
            } else {
                res.status(500).json({error: 'Erreur serveur.'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur.'});
        }
    }

    static async findComplet(req: CustomRequest, res: Response) {
        try {
            const id = req.token?.id;
            const userDAO = new UserDAO();
            const user = await userDAO.findComplet(id);
            if (!user) {
                res.status(401).json({message: "User not found"});
            } else if(user instanceof User) {
                res.status(200).json(user.toJson());
            } else {
                res.status(500).json({error: 'Erreur serveur.'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur.'});
        }
    }


    static async forceGetAll(req: Request, res: Response) {
        try {
            const users = await UserDAO.forceGetAll();
            const usersJson = users.map((user: any) => user.toJson());
            res.status(200).json(usersJson);
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur.'});
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const {log, mdp} = req.body;
            if(log && mdp) {
                const mdpHash = await bcrypt.hash(mdp, 10);
                const user = new User(0, log, mdpHash, false);
                const newUser = await UserDAO.create(user);
                if(!newUser) {
                    res.status(500).json({message: "Create probleme"});
                } else if (newUser instanceof User) {
                    res.status(200).json(newUser.toJson());
                } else {
                    res.status(500).json({error: 'Erreur serveur.'});
                }
            } else {
                res.status(401).json({message: "Not all informations"});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur.'});
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const {log, mdp} = req.body;
            if(log && mdp && id) {
                const mdpHash = await bcrypt.hash(mdp, 10);
                const user = new User(id, log, mdpHash, false);
                const nbRow = await UserDAO.update(user);
                if(!nbRow) {
                    res.status(401).json({message: "User not update"});
                } else if(nbRow >= 1){
                    res.status(200).json(user.toJson());
                }
            } else {
                res.status(500).json({error: 'Erreur serveur.'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur.'});
        }
    }

    static async softDelete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await UserDAO.find(id);
            if(!user) {
                res.status(401).json({message: "User not found"});
            } else if(user instanceof User) {
                const nbRow = await UserDAO.softDelete(user);
                if(!nbRow) {
                    res.status(401).json({message: "User probleme delete"});
                } else if (nbRow >= 1){
                    user.del = true;
                    res.status(200).json(user.toJson())
                }
            } else {
                res.status(500).json({error: 'Erreur serveur.'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur.'});
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await UserDAO.forceFind(id);
            if(!user) {
                res.status(401).json({message: "User not found"});
            } else if(user instanceof User) {
                const nbRow = await UserDAO.delete(user);
                if(!nbRow) {
                    res.status(401).json({message: "User probleme delete"});
                } else if (nbRow >= 1){
                    res.status(200).json(user.toJson())
                }
            } else {
                res.status(500).json({error: 'Erreur serveur.'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur.'});
        }
    }

    static async restore(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);
            const user = await UserDAO.restore(userId);
            if(!user) {
                res.status(401).json({message: "User probleme restore"});
            } else if(user instanceof User) {
                res.status(200).json(user.toJson());
            } else {
                res.status(500).json({error: 'Erreur serveur.'});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Erreur serveur.'});
        }
    }
}