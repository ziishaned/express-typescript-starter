import express, {Request, Response} from "express";

import authRoutes from "./user";

const router = express.Router();
router.get("/status", (req: Request, res: Response) => res.json({message: "ok"}));
router.use("/user", authRoutes);

export default router;