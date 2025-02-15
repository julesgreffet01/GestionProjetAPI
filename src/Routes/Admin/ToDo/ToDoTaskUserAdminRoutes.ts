import express from 'express';
const router = express.Router();
import {ToDoTaskUserController} from "../../../Controllers/ToDo/ToDoTaskUserController";
import {verifUserInProject} from "../../../Middlewares/UserInProject";

router.get('/:taskId', ToDoTaskUserController.getAllByTask);

router.post('/', verifUserInProject, ToDoTaskUserController.create);

router.delete('/:userId/:taskId', ToDoTaskUserController.delete);

export default router;