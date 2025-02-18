import express from 'express';
const router = express.Router();
import {TrelloCardUserController} from "../../../Controllers/Trello/TrelloCardUserController";

router.get('/', TrelloCardUserController.getAllByCard)

router.post('/', TrelloCardUserController.create);  //todo admin/collaborateur

router.delete('/:id', TrelloCardUserController.delete); //todo admin/collaborateur

export default router;