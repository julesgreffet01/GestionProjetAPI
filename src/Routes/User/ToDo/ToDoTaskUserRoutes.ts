import express from 'express';
const router = express.Router({ mergeParams: true });
import {ToDoTaskUserController} from "../../../Controllers/ToDo/ToDoTaskUserController";
import {verifDroitUser} from "../../../Middlewares/UserVerifDroitInProject";

router.get('/', ToDoTaskUserController.getAllByTask)

router.post('/', verifDroitUser('Collaborateur', 'Admin'), ToDoTaskUserController.create);

router.delete('/:userId', verifDroitUser('Collaborateur', 'Admin'), ToDoTaskUserController.delete);

export default router;