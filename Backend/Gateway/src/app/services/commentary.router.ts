import { Router } from 'express';
import config from '../../config/config';
import { apiAdapter } from '../adapter/apiAdapter';

const router = Router();
const BASE_URL = config.SERVICE_COMMENTARY;
const api = apiAdapter(BASE_URL);

router.route("/")
.post((req, res) => {
    api.post(req.path, req.body)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
})
.delete((req, res) => {
    api.delete(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
});

router.route("/:id")
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

router.route("/recipe/:recipe")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
})
.delete((req, res) => {
    api.delete(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
});

router.route("/user/:user")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
})
.delete((req, res) => {
    api.delete(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
});

export default router;