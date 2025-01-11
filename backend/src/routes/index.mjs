import { Router } from "express";
import userRouter from "./users.mjs"


const router = Router();


router.use(userRouter);


export default router;
