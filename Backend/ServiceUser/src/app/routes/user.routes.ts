import { Router } from 'express';
import * as Controller from '../controller/user.controller';

const router = Router();

router.route("/")
.post(Controller.post)

router.route("/:id")
.get(Controller.getID)

router.route("/email/:email")
.get(Controller.getEmail)
.put(Controller.put)
.delete(Controller.deleteEmail);

router.route("/username/:username")
.get(Controller.getUsername)
.put(Controller.put)
.delete(Controller.deleteUsername);

export default router;