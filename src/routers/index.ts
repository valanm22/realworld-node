import { Router } from "express";
import hw from "@src/routers/hw";

const routers = Router();

routers.use(hw);

export default routers;