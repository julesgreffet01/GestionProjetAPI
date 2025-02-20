import express from 'express';
const router = express.Router({ mergeParams: true });
import {TrelloListController} from "../../../Controllers/Trello/TrelloListController";
import TrelloCardRoutes from "./TrelloCardRoutes";
import {verifDroitUser} from "../../../Middlewares/UserVerifDroitInProject";

router.get('/', TrelloListController.getAllByPositionAndTrello)
router.get('/del', TrelloListController.getAllDelByTrello)

router.get('/:id', TrelloListController.find)

router.post('/', verifDroitUser('Collaborateur', 'Admin'), TrelloListController.create)

router.put('/:id', verifDroitUser('Collaborateur', 'Admin'), TrelloListController.update)
router.put('/restore/:id', verifDroitUser('Collaborateur', 'Admin'), TrelloListController.restore)
router.put('/position', verifDroitUser('Collaborateur', 'Admin'), TrelloListController.updatePosition)

router.delete('/:id', verifDroitUser('Collaborateur', 'Admin'), TrelloListController.softDelete)

router.use('/:listId/Card', TrelloCardRoutes)

export default router;