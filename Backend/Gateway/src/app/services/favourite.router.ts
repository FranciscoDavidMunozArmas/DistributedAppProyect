import { Router } from 'express';
import config from '../../config/config';
import { apiAdapter } from '../adapter/apiAdapter';

const router = Router();
const BASE_URL = config.SERVICE_FAVOURITES;
const api = apiAdapter(BASE_URL);

router.route("/:user/")
    .post((req, res) => {
        api.post(req.path, req.body)
            .then(data => res.send(data.data))
            .catch(err => res.send(err));
    })
    .get((req, res) => {
        api.get(req.path)
            .then(data => res.send(data.data))
            .catch(err => res.send(err));
    });

router.route("/:user/:recipe")
    .delete((req, res) => {
        api.delete(req.path)
            .then(data => res.send(data.data))
            .catch(err => res.send(err));
    });

export default router;