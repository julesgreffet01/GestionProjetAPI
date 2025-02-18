import express from 'express';
const router = express.Router();
import {RoleController} from "../../Controllers/RoleController";

router.get('/', RoleController.getAll);

export default router;