import { Router } from 'express';
import config from '../../config/config';
import { apiAdapter } from '../adapter/apiAdapter';

const router = Router();
const BASE_URL = config.SERVICE_RECIPE;
const api = apiAdapter(BASE_URL);

router.route("/")
.get((req, res) => {
    api.get(req.path)
    .then(data => res.send(data.data))
    .catch(err => res.send(err));
})
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

router.route("/recipe/:id")
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

router.route("/recipe/author/:id")
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

router.route("/recipe/category/:category")
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