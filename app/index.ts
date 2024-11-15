import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import config from "../knexfile";
import { Model } from "objection";
import Knex from "knex";
import cors from 'cors';

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

app.get("/", (req: Request, res: Response) => {
  res.send(`Express + Typescript server ${port}`);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;