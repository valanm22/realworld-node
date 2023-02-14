import express, { Application } from "express";
import routers from "@src/routers"; 

const app: Application = express();

app.use(routers);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});