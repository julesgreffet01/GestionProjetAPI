import express from 'express';
const router = express.Router();
import {TrelloCardController} from "../../../Controllers/Trello/TrelloCardController";


router.get('/force/', TrelloCardController.forceGetAll)

router.get('/list/:listId', TrelloCardController.getAllByListAndPosition)

router.get('/:id', TrelloCardController.find)

router.post('/', TrelloCardController.create);
router.post('/position/', TrelloCardController.updatePosition);

router.put('/:id', TrelloCardController.update);

export default router;