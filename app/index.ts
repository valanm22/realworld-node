import app from "./global/app";
import db from "./global/db";
import env from "./global/env";

async function initServer() {
    try {
        await db.initialize();

        console.log("Database initialized");

        app.listen(env.SERVER_PORT, () => {
            console.log("Server is running on port", env.SERVER_PORT);
        });
    } catch (error) {
        console.log(error);
    }
}

initServer();
