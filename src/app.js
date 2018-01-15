import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
    config
} from 'dotenv';

import {
    setupDefaultAdminUser,
    setupMoment
} from './config';

import * as middleware from './middleware';

import {
    MongoFactory
} from './database';

import AuthRouter from './routes/auth';
import UserRouter from './routes/user';
import RasgadaRouter from './routes/rasgada';

config();

let app = express();

app.use(cors());
app.use(bodyParser.json());

// Auth middleware
app.use(middleware.tokenFilter);
app.use(middleware.authFilter);

// API routes
app.use('/api/auth', AuthRouter);
app.use('/api/users', UserRouter);
app.use('/api/rasgadas', RasgadaRouter);

// Error handling
app.use(middleware.errorLogger);
app.use(middleware.errorHandler);

MongoFactory.getInstance()
    .on('error', console.error)
    .on('disconnect', MongoFactory.connect);

setupMoment();
setupDefaultAdminUser();

app.listen(process.env.SV_PORT, () => console.log('Your project is running on port', process.env.SV_PORT));