import express from 'express';
const router = express.Router();
import {TrelloCardUserController} from "../../../Controllers/Trello/TrelloCardUserController";
import {verifUserInProject} from "../../../Middlewares/UserInProject";

router.get('/:cardId', TrelloCardUserController.getAllByCard)

router.post('/', verifUserInProject, TrelloCardUserController.create);

router.delete('/:cardId/:userId', TrelloCardUserController.delete);

export default router;