import { Router } from 'express';
import * as Controller from '../controller/top.controller';

const router = Router();

router.route("/recipes")
.get(Controller.getTopRecipes);

router.route("/recipes/:max")
.get(Controller.getTopRecipes);

router.route("/category/:category")
.get(Controller.getTopCategory);

router.route("/category/:category/:max")
.get(Controller.getTopCategory);


export default router;