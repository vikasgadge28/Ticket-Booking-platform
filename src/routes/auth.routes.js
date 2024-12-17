import express from "express";
import { Login, Register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", Register);
router.post("/login", Login);

export default router;
