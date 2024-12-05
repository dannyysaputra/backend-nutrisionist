import { Router } from "express";
import { DailyProgressController } from "../app/controllers/api/v1/DailyProgressController";
import { authorize } from "../app/middlewares/authorize";

const router = Router();

router.get('/', authorize, DailyProgressController.get);
router.get("/:id", authorize, DailyProgressController.getById);

export default router;