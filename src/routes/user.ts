import express from "express";

import validation from "../validations/user";
import {authenticate, register} from "../controllers/user";

const router = express.Router();

router.post("/login", validation.login, authenticate);
router.post("/register", validation.register, register);

export default router;