import express from 'express';
const router = express.Router();
import {AdminController} from "../../Controllers/AdminController";

router.post('/login', AdminController.authentification);

export default router;