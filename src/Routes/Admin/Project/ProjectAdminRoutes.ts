import express from 'express';
const   router = express.Router();
import {ProjectController} from "../../../Controllers/Project/ProjectController";


router.get('/force/', ProjectController.forceGetAll)
router.get('/force/:id', ProjectController.forceFind)

router.get('/:id', ProjectController.find);

router.post('/', ProjectController.create);
router.post('/restore/:id', ProjectController.restore);

router.put('/:id', ProjectController.update);

router.delete('/:id', ProjectController.softDelete);
router.delete('/force/:id', ProjectController.delete);

export default router;