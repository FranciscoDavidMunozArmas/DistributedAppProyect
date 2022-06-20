import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import config from './config/config';

import commentaryRouter from './app/routes/index.routes';

const app = express();

//settings
app.set("port", config.PORT);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//routes
app.use("/commentaries", commentaryRouter);

export default app;