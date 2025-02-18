import express from 'express';
const router = express.Router();
import {UserController} from "../../Controllers/UserController";
import {loginUnique} from "../../Middlewares/LoginUnique";


// On place les routes "force" avant la route générique :id
router.get('/force', UserController.forceGetAll);

router.get('/findComplet/:id', UserController.findComplet);

// post
router.post('/', loginUnique,UserController.create);

// update
router.put('/:id', UserController.update);
router.put('/restore/:id', UserController.restore);

//delete
router.delete('/:id', UserController.softDelete);
router.delete('/force/:id', UserController.delete);

export default router;
