import express from 'express';
const router = express.Router();
import {ProjectController} from "../../../Controllers/Project/ProjectController";

router.get('/', ProjectController.getAll)

router.get('/force/', ProjectController.forceGetAll)
router.get('/force/:id', ProjectController.forceFind)

router.get('/:id', ProjectController.find);

router.post('/', ProjectController.create);

router.put('/:id', ProjectController.update);

router.delete('/softDelete/:id', ProjectController.softDelete);
router.delete('/:id', ProjectController.delete);

export default router;