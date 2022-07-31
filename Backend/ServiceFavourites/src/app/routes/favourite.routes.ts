import { Router } from 'express';
import * as Controller from '../controller/favourite.controller';

const router = Router();

router.route("/:user")
.post(Controller.saveFavourite)
.get(Controller.getFavourites);

router.route("/:user/:recipe")
.delete(Controller.removeFavourite);

export default router;