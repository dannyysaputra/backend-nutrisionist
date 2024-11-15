import { Router } from "express";
import { AuthController } from "../app/controllers/api/v1/AuthController";
import upload from "../app/middlewares/multes";

const router = Router();

router.get('/', AuthController.getCurrentUser);
router.post("/register", upload.single('avatar'), AuthController.register);
router.post("/login", AuthController.login);

export default router;