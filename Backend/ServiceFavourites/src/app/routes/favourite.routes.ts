import { Router } from 'express';
import * as Controller from '../controller/favourite.controller';

const router = Router();

router.route("/:user")
.post(Controller.saveFavourite)

router.route("/:user/:recipe")
.get(Controller.getFavourites)
.delete(Controller.removeFavourite);

export default router;