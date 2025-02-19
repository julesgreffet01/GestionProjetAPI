import express from 'express';
const router = express.Router({ mergeParams: true });
import {ToDoTaskUserController} from "../../../Controllers/ToDo/ToDoTaskUserController";

router.get('/', ToDoTaskUserController.getAllByTask)

router.post('/', ToDoTaskUserController.create);        //todo admin/collaborateur

router.delete('/:userId', ToDoTaskUserController.delete);   //todo admin/collaborateur

export default router;