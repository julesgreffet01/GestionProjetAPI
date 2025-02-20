import express from 'express';
const router = express.Router({ mergeParams: true });
import {ProjectUserController} from "../../../Controllers/Project/ProjectUserController";
import {verifDroitUser} from "../../../Middlewares/UserVerifDroitInProject";

router.get('/', ProjectUserController.getAllByProj)
router.post('/', verifDroitUser('Admin'),  ProjectUserController.create);

router.put('/:userId', verifDroitUser('Admin'),  ProjectUserController.update);

router.delete('/:userId', verifDroitUser('Admin'),  ProjectUserController.delete);

export default router;