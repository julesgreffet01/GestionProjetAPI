import express from 'express';
const router = express.Router();
import {TrelloListController} from "../../../Controllers/Trello/TrelloListController";



router.get ('/force/:id', TrelloListController.forceFind)

router.get('/trello/:trelloId', TrelloListController.getAllByPositionAndTrello)

router.get('/:id', TrelloListController.find)

router.post('/', TrelloListController.create);
router.post('/position', TrelloListController.updatePosition);
router.post('/restore/:id', TrelloListController.restore);

router.put('/:id', TrelloListController.update)

router.delete('/:id', TrelloListController.softDelete)
router.delete('/force/:id', TrelloListController.delete)

export default router;