import express from 'express';
const router = express.Router();
import {TrelloCardUserController} from "../../../Controllers/Trello/TrelloCardUserController";

router.get('/:cardId', TrelloCardUserController.getAllByCard)

router.post('/', TrelloCardUserController.create);

router.delete('/:cardId/:userId', TrelloCardUserController.delete);

export default router;