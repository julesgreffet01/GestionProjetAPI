import express from 'express';
const router = express.Router();
import {ProjectUserController} from "../../../Controllers/Project/ProjectUserController";

router.get('/user/:userId', ProjectUserController.getAllByUser);

router.get('/proj/:projId', ProjectUserController.getAllByProj);

router.post('/', ProjectUserController.create);

router.delete('/:userId/:projId', ProjectUserController.delete);

export default router;