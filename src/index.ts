import { config } from 'dotenv';
import express, { Application, json } from 'express';
import { ConnectOptions, connect } from 'mongoose';
import { connectAPI } from './api/connect';

config();

const app: Application = express();

app.use(json());

connectAPI(app, '/api');

app.listen(process.env.PORT, () => {
    connect(process.env.DB_CONNECTION_STRING as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log(`Server listening on port ${process.env.PORT}`))
    .catch(error => console.log(error + "from error"));
})