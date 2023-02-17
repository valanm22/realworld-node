import { str, host, port } from "envalid";

export const specs = {
    NODE_ENV: str({ choices: ["development", "production", "test"] }),

    PG_HOSTNAME: host({ devDefault: "localhost" }),
    PG_PORT: port({ default: 5432 }),
    PG_USERNAME: str(),
    PG_PASSWORD: str(),
    PG_NAME: str(),

    SERVER_PORT: port({ devDefault: 3000 }),
};
