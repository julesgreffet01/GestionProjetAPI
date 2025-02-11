import express from 'express';
const router = express.Router();
import {AdminController} from "../../Controllers/AdminController";
import {adminAuth} from "../../Middlewares/AdminMiddleware";
import UserAdminRoutes from "./UserAdminRoutes";
import ProjectAdminRoutes from "./Project/ProjectAdminRoutes";
import ProjectUserAdminRoutes from "./Project/ProjectUserAdminRoutes";

router.post('/login', AdminController.authentification);

router.get('/token', adminAuth, (req, res) => {
    res.status(200).json({message: "good token"});
})

router.use('/user', adminAuth, UserAdminRoutes);
router.use('/project', adminAuth, ProjectAdminRoutes);
router.use('/projectUser', adminAuth, ProjectUserAdminRoutes);

export default router;