import express, { Application } from "express";
import routes from "./routes";
import errors from "../middlewares/errors";
import { NotFoundError } from "./errors";

const app: Application = express();

app.use(express.json());

app.use("/api", routes);
app.use((req, res, next) => {
    next(new NotFoundError());
});
app.use(errors);

export default app;
