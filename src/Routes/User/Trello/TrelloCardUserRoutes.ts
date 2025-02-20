import express from 'express';
const router = express.Router({ mergeParams: true });
import {TrelloCardUserController} from "../../../Controllers/Trello/TrelloCardUserController";

router.get('/', TrelloCardUserController.getAllByCard)

router.post('/', TrelloCardUserController.create);  //todo admin/collaborateur

router.delete('/:userId', TrelloCardUserController.delete); //todo admin/collaborateur

export default router;