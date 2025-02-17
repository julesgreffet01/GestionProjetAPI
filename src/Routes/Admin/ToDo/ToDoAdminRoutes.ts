import express from 'express';
const router = express.Router();
import {ToDoController} from "../../../Controllers/ToDo/ToDoController";


router.get('/force/', ToDoController.forceGetAll);

router.get('/project/:projectId', ToDoController.getAllByProject)

router.get('/:id', ToDoController.find);

router.post('/', ToDoController.create);
router.post('/restore/:id', ToDoController.restore);

router.put('/:id', ToDoController.update);

router.delete('/:id', ToDoController.softDelete);
router.delete('/force/:id', ToDoController.delete);

export default router;