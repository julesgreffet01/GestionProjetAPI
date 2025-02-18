import express from 'express';
const router = express.Router();
import {UserController} from "../../Controllers/UserController";
import RoleUserRoutes from "./RoleUserRoutes";

router.get('/login', UserController.authenticate);
router.get('/complet/:id', UserController.findComplet);
router.get('/:id', UserController.find)
router.put('/:id', UserController.update)


router.use('/role', RoleUserRoutes);

export default router;