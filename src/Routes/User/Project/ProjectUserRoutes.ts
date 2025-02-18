import express from 'express';
const router = express.Router();
import {ProjectUserController} from "../../../Controllers/Project/ProjectUserController";

router.get('/', ProjectUserController.getAllByProj)
router.post('/', ProjectUserController.create); //todo seulement les admins

router.put('/:userId', ProjectUserController.update);   //todo seulement les admins

router.delete('/:userId', ProjectUserController.delete); //todo seulement les admins

export default router;