import { Router } from "express";
import { handleLogin } from "../controllers/authController.mjs";

export const router = Router();

router.post("/", handleLogin);


