import express from 'express';
const router = express.Router({ mergeParams: true });
import {TrelloCardController} from "../../../Controllers/Trello/TrelloCardController";
import TrelloCardUserRoutes from "./TrelloCardUserRoutes";

router.get('/', TrelloCardController.getAllByListAndPosition)
router.get('/realised', TrelloCardController.getAllRealisedByTrello)    //todo admin/collaborateur

router.get('/:id', TrelloCardController.find)

router.post('/:id', TrelloCardController.create)    //todo admin/collaborateur

router.put('/:id', TrelloCardController.update)     //todo admin/collaborateur
router.put('/realised/:id', TrelloCardController.changeRealised)    //todo admin/collaborateur
router.put('/position/:id', TrelloCardController.updatePosition)    //todo admin/collaborateur

router.use('/:cardId/cardUser', TrelloCardUserRoutes)

export default router;