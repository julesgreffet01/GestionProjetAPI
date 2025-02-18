import express from 'express';
const router = express.Router();
import {RoleController} from "../../Controllers/RoleController";

router.get('/force', RoleController.forceGetAll)
router.get('/force/:id', RoleController.forceFind)

router.put('/:id', RoleController.update)

export default router;