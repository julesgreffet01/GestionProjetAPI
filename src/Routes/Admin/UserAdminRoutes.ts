import express from 'express';
const router = express.Router();
import {UserController} from "../../Controllers/UserController";

// On commence par la route GET globale
router.get('/', UserController.getAll);

// On place les routes "force" avant la route générique :id
router.get('/force', UserController.forceGetAll);
router.get('/force/:id', UserController.forceFind);

router.get('/findComplet/:id', UserController.findComplet);

// Ensuite la route qui prend un paramètre :id
router.get('/:id', UserController.find);

// create
router.post('/', UserController.create);
router.post('/restore/:userId', UserController.restore);

// update
router.put('/:id', UserController.update);

//delete
router.delete('/:id', UserController.softDelete);
router.delete('/force/:id', UserController.delete);

export default router;
