import express from 'express';
const router = express.Router();
import {ProjectController} from "../../../Controllers/Project/ProjectController";
import ProjectUserRoutes from "./ProjectUserRoutes";
import ToDoRoutes from "../ToDo/ToDoRoutes";

router.get('/', ProjectController.getAllByUser) //todo ici on prend l id dans le token
router.get('/del/', ProjectController.getAllDelByCreateur)
router.get('/:id', ProjectController.find)  //todo verifier l acces au projet avec l id dans le token

router.post('/', ProjectController.create)      //todo collaborateur/admin

router.put('/:id', ProjectController.update)            //todo seulement admin/collaborateur
router.put('/restore/:id', ProjectController.restore)   //todo seulement son createur

router.delete('/:id', ProjectController.softDelete)     //todo seulement son createur

router.use('/:projectId/projectUser', ProjectUserRoutes)    //todo verifier l acces au projet avec l id dans le token
router.use('/:projectId/ToDo', ToDoRoutes)      //todo verifier l acces au projet avec l id dans le token


export default router;