import { Router } from "express";

import users from "../middlewares/users";

const router = Router();

router.post("/users", users.register);

export default router;