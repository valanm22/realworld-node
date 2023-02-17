import { DataSource } from "typeorm";

const db = new DataSource({
    type: "postgres",
    host: process.env.DB_HOSTNAME,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ __dirname + "/models/*.{js,ts}"],
    synchronize: true
});

export default db;
