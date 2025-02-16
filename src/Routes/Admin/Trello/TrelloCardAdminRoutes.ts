import express from 'express';
const router = express.Router();
import {TrelloCardController} from "../../../Controllers/Trello/TrelloCardController";

router.get('/', TrelloCardController.getAll);

router.get('/force/', TrelloCardController.forceGetAll)
router.get('/force/:id', TrelloCardController.forceFind)

router.get('/list/:listId', TrelloCardController.getAllByList)

router.get('/:id', TrelloCardController.find)

router.post('/', TrelloCardController.create);
router.post('/position/', TrelloCardController.updatePosition);

router.put('/:id', TrelloCardController.update);

router.delete('/:id', TrelloCardController.softDelete);
router.delete('/force/:id', TrelloCardController.delete);

export default router;