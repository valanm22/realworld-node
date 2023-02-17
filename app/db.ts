import { DataSource } from "typeorm";

const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "willpinha",
    password: "12066464lL",
    database: "test",
    entities: [ __dirname + "/models/*.{js,ts}"],
    synchronize: true
});

export default db;
