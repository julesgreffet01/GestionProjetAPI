import express from 'express';
const router = express.Router();
import {UserController} from "../../Controllers/UserController";
import RoleUserRoutes from "./RoleUserRoutes";
import ProjectRoutes from "./Project/ProjectRoutes";
import {userAuth} from "../../Middlewares/UserAuth";

router.get('/findComplet/',userAuth, UserController.findComplet);
router.get('/find',userAuth, UserController.find);
router.post('/login', UserController.authenticate);
router.put('/:id',userAuth, UserController.update);


router.use('/Role',userAuth, RoleUserRoutes);
router.use('/Project',userAuth, ProjectRoutes);

export default router;