import { Router } from "express";
import { hello, world } from "@src/middlewares/hw";

const router = Router();

router.get("/hello", hello);
router.get("/world", world);

export default router;