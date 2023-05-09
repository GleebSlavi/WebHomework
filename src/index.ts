import { config } from 'dotenv';
import express, { Application, json } from 'express';
import { ConnectOptions, connect } from 'mongoose';
import { connectAPI } from './api/connect';

config();

const mongoUri = process.env.DB_CONNECTION_STRING;
const port = process.env.PORT;

const app: Application = express();

app.use(json());

connectAPI(app, '/api');

app.listen(port, () => {
    connect(mongoUri as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log(`Server listening on port ${port}`))
    .catch(error => console.log(error));
})