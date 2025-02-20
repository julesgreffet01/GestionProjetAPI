import express from 'express';
const router = express.Router({ mergeParams: true });
import {TrelloController} from "../../../Controllers/Trello/TrelloController";
import TrelloListRoutes from "./TrelloListRoutes";

router.get('/', TrelloController.getAllByProject)
router.get('/del', TrelloController.getAllDelByProject) //todo collaborateur/admin

router.get('/:id', TrelloController.find)

router.post('/', TrelloController.create)   //todo collaborateur/admin

router.put('/:id', TrelloController.update) //todo collaborateur/admin
router.put('/restore/:id', TrelloController.restore)    //todo collaborateur/admin

router.delete('/:id', TrelloController.softDelete)  //todo collaborateur/admin

router.use('/:trelloId/List', TrelloListRoutes)

export default router;