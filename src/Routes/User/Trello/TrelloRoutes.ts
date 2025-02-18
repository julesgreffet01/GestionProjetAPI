import express from 'express';
const router = express.Router();
import {TrelloController} from "../../../Controllers/Trello/TrelloController";
import TrelloListRoutes from "./TrelloListRoutes";

router.get('/', TrelloController.getAllByProject)   //todo on prend l id dans le token
router.get('/del', TrelloController.getAllDelByProject) //todo on prend l id dans le token

router.get('/:id', TrelloController.find)

router.post('/', TrelloController.create)   //todo collaborateur/admin

router.put('/:id', TrelloController.update) //todo collaborateur/admin
router.put('/restore/:id', TrelloController.restore)    //todo collaborateur/admin

router.delete('/:id', TrelloController.softDelete)  //todo collaborateur/admin

router.use('/:trelloId/list', TrelloListRoutes)

export default router;