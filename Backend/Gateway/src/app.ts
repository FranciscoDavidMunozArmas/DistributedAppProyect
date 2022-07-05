import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import config from './config/config';

import indexRouter from './app/router/router';

const app = express();

//settings
app.set("port", config.PORT);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(`/${config.PREFIX}/v${config.VERSION}`, indexRouter);

export default app;