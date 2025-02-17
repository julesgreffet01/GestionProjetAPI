import express from 'express';
const   router = express.Router();
import {ProjectController} from "../../../Controllers/Project/ProjectController";



router.get('/:id', ProjectController.find);

router.post('/', ProjectController.create);
router.post('/restore/:id', ProjectController.restore);

router.put('/:id', ProjectController.update);

router.delete('/:id', ProjectController.softDelete);

export default router;