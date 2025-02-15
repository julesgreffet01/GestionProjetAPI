import express from 'express';
const router = express.Router();
import {TrelloListController} from "../../../Controllers/Trello/TrelloListController";


router.get('/', TrelloListController.getAll)

router.get('/force', TrelloListController.forceGetAll)
router.get ('/force/:id', TrelloListController.forceFind)

router.get('/trello/:trelloId', TrelloListController.getAllByTrello)

router.post('/', TrelloListController.create);
router.post('/position', TrelloListController.updatePosition);

router.put('/:id', TrelloListController.update)

router.delete('/:id', TrelloListController.softDelete)
router.delete('/force/:id', TrelloListController.delete)

export default router;