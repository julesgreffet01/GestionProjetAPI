import express from 'express';
const router = express.Router();
import {RoleController} from "../../Controllers/RoleController";

router.get('/', RoleController.getAll)

router.get('/force', RoleController.forceGetAll)
router.get('/force/:id', RoleController.forceFind)

router.get('/:id', RoleController.find)

router.post('/', RoleController.create)
router.post('/restore/:id', RoleController.restore)

router.put('/:id', RoleController.update)

router.delete('/force/:id', RoleController.delete)
router.delete('/:id', RoleController.softDelete)

export default router;