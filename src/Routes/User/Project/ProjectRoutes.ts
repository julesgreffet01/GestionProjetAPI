import express from 'express';
import {ProjectController} from "../../../Controllers/Project/ProjectController";
import ProjectUserRoutes from "./ProjectUserRoutes";
import ToDoRoutes from "../ToDo/ToDoRoutes";
import TrelloRoutes from "../Trello/TrelloRoutes";
import {verifUserInProject} from "../../../Middlewares/UserInProject";
import {verifDroitUser} from "../../../Middlewares/UserVerifDroitInProject";

const router = express.Router();

router.get('/', ProjectController.getAllByUser)
router.get('/del/', ProjectController.getAllDelByCreateur)
router.get('/:projectId', verifUserInProject, ProjectController.find)

router.post('/', ProjectController.create)

router.put('/:projectId', verifDroitUser('Collaborateur', 'Admin'), ProjectController.update)
router.put('/restore/:id', ProjectController.restore)   //todo seulement son createur

router.delete('/:id', ProjectController.softDelete)     //todo seulement son createur

router.use('/:projectId/ProjectUser', verifUserInProject, ProjectUserRoutes)
router.use('/:projectId/ToDo', verifUserInProject, ToDoRoutes)
router.use('/:projectId/Trello', verifUserInProject, TrelloRoutes)

export default router;