import express from 'express';
const router = express.Router({ mergeParams: true });
import {ToDoController} from "../../../Controllers/ToDo/ToDoController";
import ToDoTaskRoutes from "./ToDoTaskRoutes";

router.get('/', ToDoController.getAllByProject)
router.get('/del', ToDoController.getAllDelByProject)   //todo collaborateur/admin

router.get('/:id', ToDoController.find)

router.post('/', ToDoController.create) //todo collaborateur/admin

router.put('/:id', ToDoController.update)   //todo collaborateur/admin
router.put('/restore/:id', ToDoController.restore)   //todo collaborateur/admin

router.delete('/:id', ToDoController.softDelete)    //todo collaborateur/admin


router.use('/:todoId/Task', ToDoTaskRoutes)

export default router;