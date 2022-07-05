import { Router } from 'express';
import * as Controller from '../controller/recipe.controller';

const router = Router();

router.route("/")
.get(Controller.getAll)
.post(Controller.post)
.delete(Controller.deleteAll);

router.route("/recipe/:id")
.get(Controller.getID)
.put(Controller.putID)
.delete(Controller.deleteID);

router.route("/recipe/author/:id")
.get(Controller.getAuthorID)
.delete(Controller.deleteAuthorID);

router.route("/recipe/category/:category")
.get(Controller.getCategory)

export default router;