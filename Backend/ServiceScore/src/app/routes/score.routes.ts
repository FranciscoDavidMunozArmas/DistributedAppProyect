import { Router } from 'express';
import * as Controller from '../controller/score.controller';

const router = Router();

router.route("/recipes/")
.get(Controller.getScores)

router.route("/recipes/:recipe")
.get(Controller.getScore)
.post(Controller.postScore)
.delete(Controller.deleteScore);

export default router;