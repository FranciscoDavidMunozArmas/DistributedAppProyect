import { Router } from 'express';
import * as Controller from '../controller/commentary.controller';

const router = Router();

router.route("/")
.post(Controller.postCommentary)
.delete(Controller.deleteCommentaries);

router.route("/:id")
.put(Controller.putCommentary)
.delete(Controller.deleteCommentary);

router.route("/recipe/:recipe")
.get(Controller.getCommentaryByRecipe)
.delete(Controller.deleteCommentaryByRecipe);

router.route("/user/:user")
.get(Controller.getComentaryByUser)
.delete(Controller.deleteCommentaryByUser);

export default router;