import dotenv from "dotenv";
import { cleanEnv } from "envalid";
import { specs } from "../config/env";

dotenv.config();

export default cleanEnv(process.env, specs);
