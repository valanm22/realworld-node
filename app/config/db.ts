import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { User } from "../models/User";
import env from "../global/env";

const {
    PG_HOSTNAME,
    PG_PORT,
    PG_USERNAME,
    PG_PASSWORD,
    PG_NAME
} = env; 

const entities = [ User ];

/**
 * NODE_ENV="development" 
 * 
 * Used when accessing the REST API manually from a local machine
 */
export const development: PostgresConnectionOptions  = {
    type: "postgres",
    host: PG_HOSTNAME,
    port: PG_PORT,
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_NAME,
    entities,
    synchronize: true,
};

/**
 * NODE_ENV="production"
 * 
 * Used when running the REST API in a production server
 */
export const production: PostgresConnectionOptions = {
    type: "postgres",
    host: PG_HOSTNAME,
    port: PG_PORT,
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_NAME,
    entities,
};

/**
 * NODE_ENV="test" 
 * 
 * Used when running tests. An in-memory SQLite database is used
 */
export const test: SqliteConnectionOptions  = {
    type: "sqlite",
    database: ":memory:",
    entities,
    synchronize: true,
};
