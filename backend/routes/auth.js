import express from "express";
import { login } from "../controllers/auth.js";
import { loginLimiter } from "../middleware/ratelimit.js"

const router = express.Router();

router.post("/login", loginLimiter, login);

export default router;