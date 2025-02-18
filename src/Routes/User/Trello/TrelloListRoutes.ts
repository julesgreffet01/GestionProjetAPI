import express from 'express';
const router = express.Router();
import {TrelloListController} from "../../../Controllers/Trello/TrelloListController";
import TrelloCardRoutes from "./TrelloCardRoutes";

router.get('/', TrelloListController.getAllByPositionAndTrello)
router.get('/del', TrelloListController.getAllDelByTrello)  //todo admin/collaborateur

router.get('/:id', TrelloListController.find)

router.post('/', TrelloListController.create)   //todo admin/collaborateur

router.put('/:id', TrelloListController.update)     //todo admin/collaborateur
router.put('/restore/:id', TrelloListController.restore)    //todo admin/collaborateur
router.put('/position', TrelloListController.updatePosition)    //todo admin/collaborateur

router.delete('/:id', TrelloListController.softDelete)  //todo admin/collaborateur

router.use('/:listId/card', TrelloCardRoutes)

export default router;