import { Router } from "express";
import { PhysicalDataController } from "../app/controllers/api/v1/PhysicalDataController";
import { authorize } from "../app/middlewares/autorize";

const router = Router();

router.post("/", authorize, PhysicalDataController.createPhysicalData);
router.get('/', authorize, PhysicalDataController.getPhysicalDatas);
router.put("/:id", authorize, PhysicalDataController.updatePhysicalData);
router.delete("/:id", authorize, PhysicalDataController.deletePhysicalData);

export default router;