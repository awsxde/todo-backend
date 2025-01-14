import express from "express";
import { create, list, remove, update } from "../controllers/todo.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticate, create);
router.get("/", authenticate, list);
router.put("/", authenticate, update);
router.delete("/", authenticate, remove);

export default router;
