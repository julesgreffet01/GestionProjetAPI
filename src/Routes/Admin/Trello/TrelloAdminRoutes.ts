import express from 'express';
const router = express.Router();
import {TrelloController} from "../../../Controllers/Trello/TrelloController";

router.get('/', TrelloController.getAll);

router.get('/force/', TrelloController.forceGetAll);
router.get('/force/:id', TrelloController.forceFind)

router.get('/project/:projectId', TrelloController.getAllByProject)

router.get('/:id', TrelloController.find)

router.post('/', TrelloController.create);
router.post('/restore/:id', TrelloController.restore);

router.put('/:id', TrelloController.update);

router.delete('/:id', TrelloController.softDelete);
router.delete('/force/:id', TrelloController.delete);

export default router;