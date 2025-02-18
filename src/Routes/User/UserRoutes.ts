import express from 'express';
const router = express.Router();
import {UserController} from "../../Controllers/UserController";
import RoleUserRoutes from "./RoleUserRoutes";
import ProjectRoutes from "./Project/ProjectRoutes";

router.get('/complet/:id', UserController.findComplet);     //todo par token
router.get('/:id', UserController.find)     //todo par token
router.post('/login', UserController.authenticate);
router.put('/:id', UserController.update)   //todo par token


router.use('/role', RoleUserRoutes);    //todo par token
router.use('/project', ProjectRoutes);  //todo par token

export default router;