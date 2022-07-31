import { Router } from 'express';
import multer from '../../config/multer';
import * as Controller from '../controller/recipe.controller';

const router = Router();

router.route("/")
.get(Controller.getAll)
.post(multer.single("image"), Controller.post)
.delete(Controller.deleteAll);

router.route("/recipe/:id")
.get(Controller.getID)
.put(multer.single("image"), Controller.putID)
.delete(Controller.deleteID);

router.route("/recipe/author/:id")
.get(Controller.getAuthorID)
.delete(Controller.deleteAuthorID);

router.route("/recipe/category/:category")
.get(Controller.getCategory)

export default router;