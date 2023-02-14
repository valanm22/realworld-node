import express, { Application } from "express";
import routers from "@src/routers"; 

const app: Application = express();

app.use(routers);

export default app;