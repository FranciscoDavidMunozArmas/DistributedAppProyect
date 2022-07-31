import { Router } from 'express';
import config from '../../config/config';
import { apiAdapter } from '../adapter/apiAdapter';

const router = Router();
const BASE_URL = config.SERVICE_CALENDAR;
const api = apiAdapter(BASE_URL);

router.route("/:user")
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

router.route("/:user/:calendar")
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

router.route("/:user/day")
    .post((req, res) => {
        api.post(req.path, req.body)
            .then(data => res.send(data.data))
            .catch(err => res.send(err));
    });

router.route("/:user/interval")
    .post((req, res) => {
        api.post(req.path, req.body)
            .then(data => res.send(data.data))
            .catch(err => res.send(err));
    });


export default router;