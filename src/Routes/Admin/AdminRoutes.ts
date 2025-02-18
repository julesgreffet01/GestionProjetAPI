import express from 'express';
const router = express.Router();
import {AdminController} from "../../Controllers/AdminController";
import {adminAuth} from "../../Middlewares/AdminToken";
import UserAdminRoutes from "./UserAdminRoutes";
import RoleAdminRoutes from "./RoleAdminRoutes";

router.post('/login', AdminController.authentification);

router.use('/user', adminAuth, UserAdminRoutes);    //ok
router.use('/role', adminAuth, RoleAdminRoutes);    //ok

export default router;