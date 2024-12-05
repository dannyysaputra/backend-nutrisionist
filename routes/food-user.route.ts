import { Router } from "express";
import { FoodUserController } from "../app/controllers/api/v1/FoodUserController";
import { authorize } from "../app/middlewares/authorize";

const router = Router();

router.post("/", authorize, FoodUserController.create);
router.get('/', authorize, FoodUserController.get);
router.delete("/:id", authorize, FoodUserController.delete);

export default router;