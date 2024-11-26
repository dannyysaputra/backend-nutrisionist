import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import config from "../knexfile";
import { Model } from "objection";
import Knex from "knex";
import cors from 'cors';
import authRoute from '../routes/auth.route'
import swaggerRoute from '../routes/swagger.route'
import physicalDataRoute from '../routes/physical-data.route'

const envPath = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envPath });

const app: Express = express();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = config[environment]

const knexInstance = Knex(knexConfig)
Model.knex(knexInstance)

const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/api/v1/', swaggerRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/physical-data', physicalDataRoute);

app.get("/", (req: Request, res: Response) => {
  console.log(`Listening on http://localhost:${port}`);
  res.send(`Express + Typescript server ${port}`);
});

export default app;