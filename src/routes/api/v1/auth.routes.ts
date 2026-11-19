import { Router } from "express";

import { authController } from "../../../controllers";

const router = Router();

router.post("/register", authController.register.bind(authController));

export default router;
