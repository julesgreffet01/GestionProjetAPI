import express from 'express';
const router = express.Router();
import {TrelloController} from "../../../Controllers/Trello/TrelloController";



router.get('/project/:projectId', TrelloController.getAllByProject)

router.get('/:id', TrelloController.find)

router.post('/', TrelloController.create);
router.post('/restore/:id', TrelloController.restore);

router.put('/:id', TrelloController.update);

router.delete('/:id', TrelloController.softDelete);

export default router;