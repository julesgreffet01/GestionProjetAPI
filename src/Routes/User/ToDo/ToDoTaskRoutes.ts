import express from 'express';
const router = express.Router({ mergeParams: true });
import {ToDoTaskController} from "../../../Controllers/ToDo/ToDoTaskController";
import ToDoTaskUserRoutes from "./ToDoTaskUserRoutes";

router.get('/', ToDoTaskController.getAllByOrdreByTodo)
router.get('/realised', ToDoTaskController.getAllRealisedByTodo)

router.get('/:id', ToDoTaskController.find)

router.post('/', ToDoTaskController.create)     //todo collaborateur/admin

router.put('/:id', ToDoTaskController.update)   //todo collaborateur/admin
router.put('/realised/:id', ToDoTaskController.realiser)    //todo collaborateur/admin et prendre l id du user dans son token
router.put('/ordre/', ToDoTaskController.updateOrder)   //todo collaborateur/admin
router.put('/enCours/:id', ToDoTaskController.enCours)      //todo collaborateur/admin


router.use('/:taskId/TaskUser', ToDoTaskUserRoutes)

export default router;