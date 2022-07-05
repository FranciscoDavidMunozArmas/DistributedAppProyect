import { Router } from 'express';
import * as Controller from '../controller/commentary.controller';

const router = Router();

router.route("/recipe/:id")
.get(Controller.getAll)
.post(Controller.post)
.delete(Controller.deleteAll);

router.route("/commentary/:id")
.delete(Controller.deleteID);

export default router;