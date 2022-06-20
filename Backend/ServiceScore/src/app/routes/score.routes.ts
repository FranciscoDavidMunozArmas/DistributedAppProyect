import { Router } from 'express';
import * as Controller from '../controller/score.controller';

const router = Router();

router.route("/recipe/:recipe")
.get(Controller.getScore)
.post(Controller.postScore)
.delete(Controller.deleteScore);

router.route("/recipe/:recipe/user/:user")
.put(Controller.putRecipe)

export default router;