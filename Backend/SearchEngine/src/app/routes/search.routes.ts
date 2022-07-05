import { Router } from 'express';
import * as Controller from '../controller/search.controller';

const router = Router();

router.route("/recipe/name/:name")
.get(Controller.getRecipeByName);

router.route("/recipe/author/:author")
.get(Controller.getRecipeByAuthor);

export default router;