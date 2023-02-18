import "reflect-metadata";
import { DataSource } from "typeorm";
import { development, production, test } from "../config/db";
import env from "./env";

const config =
    env.isDevelopment ? development :
    env.isProduction ? production :
    test;

export default new DataSource(config);
