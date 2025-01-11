import { Router } from "express";
import userRouter from "./users.mjs"


const router = Router();


router.use("/users", userRouter);


export default router;
