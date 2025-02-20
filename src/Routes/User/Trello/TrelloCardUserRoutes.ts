import express from 'express';
const router = express.Router({ mergeParams: true });
import {TrelloCardUserController} from "../../../Controllers/Trello/TrelloCardUserController";
import {verifDroitUser} from "../../../Middlewares/UserVerifDroitInProject";

router.get('/', TrelloCardUserController.getAllByCard)

router.post('/', verifDroitUser('Collaborateur', 'Admin'), TrelloCardUserController.create);

router.delete('/:userId', verifDroitUser('Collaborateur', 'Admin'), TrelloCardUserController.delete);

export default router;