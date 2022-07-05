import { Router } from 'express';
import config from '../../config/config';
import { apiAdapter } from '../adapter/apiAdapter';

const router = Router();
const BASE_URL = config.SERVICE_FULL_RECIPE;
const api = apiAdapter(BASE_URL);

router.route("/")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
});

router.route("/recipe/:id")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
});

router.route("/recipe/author/:id")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
});

export default router;