import express from 'express';
const router = express.Router({ mergeParams: true });
import {TrelloController} from "../../../Controllers/Trello/TrelloController";
import TrelloListRoutes from "./TrelloListRoutes";
import {verifDroitUser} from "../../../Middlewares/UserVerifDroitInProject";

router.get('/', TrelloController.getAllByProject)
router.get('/del', TrelloController.getAllDelByProject)

router.get('/:id', TrelloController.find)

router.post('/', verifDroitUser('Collaborateur', 'Admin'), TrelloController.create)

router.put('/:id', verifDroitUser('Collaborateur', 'Admin'), TrelloController.update)
router.put('/restore/:id', verifDroitUser('Collaborateur', 'Admin'), TrelloController.restore)

router.delete('/:id', verifDroitUser('Collaborateur', 'Admin'), TrelloController.softDelete)

router.use('/:trelloId/List', TrelloListRoutes)

export default router;