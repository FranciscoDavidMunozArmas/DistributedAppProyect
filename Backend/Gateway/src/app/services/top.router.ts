import { Router } from 'express';
import config from '../../config/config';
import { apiAdapter } from '../adapter/apiAdapter';

const router = Router();
const BASE_URL = config.SERVICE_TOP;
const api = apiAdapter(BASE_URL);

router.route("/recipes")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
})

router.route("/recipes/:max")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
})

router.route("/category/:category")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
})

router.route("/category/:category/:max")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
})

export default router;