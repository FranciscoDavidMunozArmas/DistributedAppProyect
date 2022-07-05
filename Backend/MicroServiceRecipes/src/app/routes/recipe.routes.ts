import { Router } from 'express';
import * as Controller from '../controller/recipe.controller';

const router = Router();

router.route("/")
.get(Controller.getRecipes);

router.route("/recipe/:id")
.get(Controller.getID);

router.route("/recipe/author/:id")
.get(Controller.getAuthorID);

export default router;