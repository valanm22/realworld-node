import app from "./app";
import db from "./db";

db.initialize()
    .then(() => {
        console.log("Database initialized");
    })
    .catch((error) => {
        console.log("Database initialization error:", error);
    });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
