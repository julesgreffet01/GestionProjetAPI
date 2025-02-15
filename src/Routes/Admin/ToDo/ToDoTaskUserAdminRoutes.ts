import express from 'express';
const router = express.Router();
import {ToDoTaskUserController} from "../../../Controllers/ToDo/ToDoTaskUserController";

router.get('/:taskId', ToDoTaskUserController.getAllByTask);

router.post('/', ToDoTaskUserController.create);

router.delete('/:userId/:taskId', ToDoTaskUserController.delete);

export default router;