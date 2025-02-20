import express from 'express';
const router = express.Router({ mergeParams: true });
import {ToDoTaskController} from "../../../Controllers/ToDo/ToDoTaskController";
import ToDoTaskUserRoutes from "./ToDoTaskUserRoutes";
import {verifDroitUser} from "../../../Middlewares/UserVerifDroitInProject";

router.get('/', ToDoTaskController.getAllByOrdreByTodo)
router.get('/realised', ToDoTaskController.getAllRealisedByTodo)

router.get('/:id', ToDoTaskController.find)

router.post('/', verifDroitUser('Collaborateur', 'Admin'), ToDoTaskController.create)

router.put('/:id', verifDroitUser('Collaborateur', 'Admin'), ToDoTaskController.update)
router.put('/realised/:id', verifDroitUser('Collaborateur', 'Admin'), ToDoTaskController.realiser)
router.put('/ordre/', verifDroitUser('Collaborateur', 'Admin'), ToDoTaskController.updateOrder)
router.put('/enCours/:id', verifDroitUser('Collaborateur', 'Admin'), ToDoTaskController.enCours)


router.use('/:taskId/TaskUser', ToDoTaskUserRoutes)

export default router;