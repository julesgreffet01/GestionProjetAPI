import {Response, NextFunction } from 'express';
import {CustomRequest} from "../Interfaces";
import {ProjectUserDAO} from "../Models/DAO/Project/ProjectUserDAO";
import {RoleDAO} from "../Models/DAO/RoleDAO";
import {Role} from "../Models/BO/Role";

export function verifDroitUser(...allowedRoles: string[]) {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.token?.id);
            const projectId = parseInt(req.params.projectId);
            if(isNaN(userId)) {
                res.status(400).json({ message: 'ID de projet invalide.' });
                return;
            }
            if(isNaN(projectId)) {
                res.status(400).json({ message: 'project de projet invalide.' });
                return;
            }
            const relation = await ProjectUserDAO.find(userId, projectId);
            if(!relation){
                res.status(403).json({ message: 'Accès refusé.' });
                return;
            }
            const userRoleId = relation.idRole;
            const role = await RoleDAO.find(userRoleId)
            let userRole;
            if(!role){
                res.status(403).json({ message: 'role pas trouve' });
                return;
            } else if(role instanceof Role){
                userRole = role.nom
            } else {
                res.status(403).json({ message: 'Accès refusé.' });
                return;
            }
            // Vérification si le rôle est autorisé
            if (!allowedRoles.includes(userRole)) {
                res.status(403).json({ message: 'Accès refusé.' });
                return;
            }
            next();  // Autorisation accordée
        } catch (error) {
            console.error(error);
            res.status(403).json({ error: 'Erreur middleware verif droit'});
        }

    };
}