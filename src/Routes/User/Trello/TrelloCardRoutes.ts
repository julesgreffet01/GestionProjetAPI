import express from 'express';
const router = express.Router({ mergeParams: true });
import {TrelloCardController} from "../../../Controllers/Trello/TrelloCardController";
import TrelloCardUserRoutes from "./TrelloCardUserRoutes";
import {verifDroitUser} from "../../../Middlewares/UserVerifDroitInProject";

router.get('/', TrelloCardController.getAllByListAndPosition)
router.get('/realised', TrelloCardController.getAllRealisedByTrello)

router.get('/:id', TrelloCardController.find)

router.post('/', verifDroitUser('Collaborateur', 'Admin'), TrelloCardController.create)

router.put('/:id', verifDroitUser('Collaborateur', 'Admin'), TrelloCardController.update)
router.put('/realised/:id', verifDroitUser('Collaborateur', 'Admin'), TrelloCardController.changeRealised)
router.put('/position/:id', verifDroitUser('Collaborateur', 'Admin'), TrelloCardController.updatePosition)

router.use('/:cardId/CardUser', TrelloCardUserRoutes)

export default router;