import express from 'express';
const router = express.Router();
import {UserController} from "../../Controllers/UserController";

router.get('/', UserController.getAll);

router.get('/:id', UserController.find);

router.get('/force', UserController.forceGetAll);

router.get('/force/:id', UserController.forceFind);

router.get('/findComplet/:id', UserController.findComplet);

router.post('/', UserController.create);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.softDelete);

router.delete('/force/:id', UserController.delete);

export default router;