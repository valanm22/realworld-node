import { Router } from "express";
import users from "../middlewares/users";
import { validate, schemas } from "../middlewares/body";

const router = Router();

router.post("/users", validate(schemas.register), users.register);

export default router;
