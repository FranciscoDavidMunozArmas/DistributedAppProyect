import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import config from './config/config';

import searchRouter from './app/routes/search.routes';

const app = express();

//settings
app.set("port", config.PORT);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//routes
app.use("/search", searchRouter);

export default app;