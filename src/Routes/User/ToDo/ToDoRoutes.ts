import express from 'express';
const router = express.Router({ mergeParams: true });
import {ToDoController} from "../../../Controllers/ToDo/ToDoController";
import ToDoTaskRoutes from "./ToDoTaskRoutes";
import {verifDroitUser} from "../../../Middlewares/UserVerifDroitInProject";

router.get('/', ToDoController.getAllByProject)
router.get('/del', ToDoController.getAllDelByProject)

router.get('/:id', ToDoController.find)

router.post('/', verifDroitUser('Collaborateur', 'Admin'), ToDoController.create)

router.put('/:id', verifDroitUser('Collaborateur', 'Admin'), ToDoController.update)
router.put('/restore/:id', verifDroitUser('Collaborateur', 'Admin'), ToDoController.restore)

router.delete('/:id', verifDroitUser('Collaborateur', 'Admin'), ToDoController.softDelete)


router.use('/:todoId/Task', ToDoTaskRoutes)

export default router;