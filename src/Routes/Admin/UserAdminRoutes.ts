import express from 'express';
const router = express.Router();
import {UserController} from "../../Controllers/UserController";
import {loginUnique} from "../../Middlewares/LoginUnique";

router.get('/', UserController.forceGetAll);

// post
router.post('/', loginUnique,UserController.create);

// update
router.put('/:id', UserController.update);
router.put('/restore/:id', UserController.restore);

//delete
router.delete('/:id', UserController.softDelete);
router.delete('/force/:id', UserController.delete);

export default router;
