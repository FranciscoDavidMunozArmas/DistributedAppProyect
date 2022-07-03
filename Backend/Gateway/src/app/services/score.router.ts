import { Router } from 'express';
import config from '../../config/config';
import { apiAdapter } from '../adapter/apiAdapter';

const router = Router();
const BASE_URL = config.SERVICE_SCORE;
const api = apiAdapter(BASE_URL);

router.route("/recipes/")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
})

router.route("/recipes/:recipe")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
})
.put((req, res) => {
    api.put(req.path, req.body)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
})
.delete((req, res) => {
    api.delete(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
});

export default router;