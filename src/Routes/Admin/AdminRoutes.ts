import express from 'express';
const router = express.Router();
import {AdminController} from "../../Controllers/AdminController";
import {adminAuth} from "../../Middlewares/AdminToken";
import UserAdminRoutes from "./UserAdminRoutes";
import RoleAdminRoutes from "./RoleAdminRoutes";
import ProjectAdminRoutes from "./Project/ProjectAdminRoutes";
import ProjectUserAdminRoutes from "./Project/ProjectUserAdminRoutes";
import ToDoAdminRoutes from "./ToDo/ToDoAdminRoutes";
import ToDoTaskUserAdminRoutes from "./ToDo/ToDoTaskUserAdminRoutes";
import TrelloAdminRoutes from "./Trello/TrelloAdminRoutes";
import TrelloListAdminRoutes from "./Trello/TrelloListAdminRoutes";
import TrelloCardAdminRoutes from "./Trello/TrelloCardAdminRoutes";
import TrelloCardUserAdminRoutes from "./Trello/TrelloCardUserAdminRoutes";

router.post('/login', AdminController.authentification);

router.get('/token', adminAuth, (req, res) => {
    res.status(200).json({message: "good token"});
})

router.use('/user', adminAuth, UserAdminRoutes);
router.use('/role', adminAuth, RoleAdminRoutes);
router.use('/project', adminAuth, ProjectAdminRoutes);
router.use('/projectUser', adminAuth, ProjectUserAdminRoutes);
router.use('/toDo', adminAuth, ToDoAdminRoutes);
router.use('/taskUser', adminAuth, ToDoTaskUserAdminRoutes);
router.use('/trello', adminAuth, TrelloAdminRoutes);
router.use('/trelloList', adminAuth, TrelloListAdminRoutes);
router.use('/trelloCard', adminAuth, TrelloCardAdminRoutes);
router.use('/cardUser', adminAuth, TrelloCardUserAdminRoutes);

export default router;