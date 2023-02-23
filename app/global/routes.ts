import { Router } from "express";
import users from "../middlewares/users";
import { validate, schemas } from "../middlewares/body";
import { authRequired } from "../middlewares/auth";

const router = Router();

router.post("/users", validate(schemas.register), users.register);
router.post("/users/login", validate(schemas.login), users.login);
router.get("/user", authRequired, users.current);
router.put("/user", validate(schemas.update), authRequired, users.update);

export default router;
