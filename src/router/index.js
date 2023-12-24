import { Router } from "express";
import clientRouter from "../controllers/client.controller.js";
import templateRouter from "../controllers/template.controller.js";

const router = Router();

router.use("/clients", clientRouter);
router.use("/template", templateRouter);

export default router;
