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
import TrelloCardUserAdminRoutes from "./Trello/TrelloCardUserAdminRoutes";

router.post('/login', AdminController.authentification);

router.get('/token', adminAuth, (req, res) => {
    res.status(200).json({message: "good token"});
})

router.use('/user', adminAuth, UserAdminRoutes);    //ok
router.use('/role', adminAuth, RoleAdminRoutes);    //ok
router.use('/project', adminAuth, ProjectAdminRoutes);  //ok
router.use('/projectUser', adminAuth, ProjectUserAdminRoutes);  //todo a mettre seulement chez les users
router.use('/toDo', adminAuth, ToDoAdminRoutes);    //todo a mettre seulement chez les users
router.use('/taskUser', adminAuth, ToDoTaskUserAdminRoutes);    //todo a mettre seulement chez les users
router.use('/trello', adminAuth, TrelloAdminRoutes);        //todo a mettre seulement chez les users
router.use('/trelloList', adminAuth, TrelloListAdminRoutes);    //todo a mettre seulement chez les users
router.use('/cardUser', adminAuth, TrelloCardUserAdminRoutes);  //todo a mettre seulement chez les users

export default router;