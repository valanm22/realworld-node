import { str, host, port, testOnly } from "envalid";

export const specs = {
    NODE_ENV: str({ choices: ["development", "production", "test"] }),

    PG_HOSTNAME: host({ devDefault: "localhost" }),
    PG_PORT: port({ default: 5432 }),
    PG_USERNAME: str({ devDefault: testOnly("not required") }),
    PG_PASSWORD: str({ devDefault: testOnly("not required") }),
    PG_NAME: str({ devDefault: testOnly("not required") }),

    SERVER_PORT: port({ devDefault: 3000 }),
};
