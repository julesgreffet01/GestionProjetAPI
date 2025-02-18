import express from 'express';
const router = express.Router();
import {ToDoTaskController} from "../../../Controllers/ToDo/ToDoTaskController";
import ToDoTaskUserRoutes from "./ToDoTaskUserRoutes";

router.get('/', ToDoTaskController.getAllByOrdreByTodo)
router.get('/realised', ToDoTaskController.getAllRealisedByTodo)

router.get('/:id', ToDoTaskController.find)

router.post('/', ToDoTaskController.create)     //todo collaborateur/admin

router.put('/:id', ToDoTaskController.update)   //todo collaborateur/admin
router.put('/realiser/:id', ToDoTaskController.realiser)    //todo collaborateur/admin
router.put('/ordre/', ToDoTaskController.updateOrder)   //todo collaborateur/admin
router.put('/enCours', ToDoTaskController.enCours)      //todo collaborateur/admin


router.use('/:taskId/taskUser', ToDoTaskUserRoutes)

export default router;