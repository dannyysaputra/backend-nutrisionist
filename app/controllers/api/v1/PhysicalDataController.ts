import { Request, Response } from "express";
import { PhysicalDataService } from "../../../services/PhysicalDataService";

const physicalDataService = new PhysicalDataService();

export class PhysicalDataController {
    public static async getPhysicalDatas(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user?.id;

            const datas = await physicalDataService.findByUserId(userId);

            return res.status(200).json({
                status: "Success",
                message: "Physical data was successfully retrieved",
                data: datas
            })
        } catch (error: any) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    }

    public static async createPhysicalData(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const userId = req.user?.id;

            if (!userId) {
                return res.status(404).json({ status: "Failed", message: "User id not found" })
            }

            // Validate required fields
            if (!data.weight || !data.height || !data.daily_activity) {
                return res.status(400).json({ message: "Incomplete data" });
            }

            const newData = await physicalDataService.create(userId, data);
            return res.status(201).json({
                status: "Success",
                message: "Data successfully created",
                data: newData
            });
        } catch (error: any) {
            return res.status(500).json({ status: 'Failed', message: error.message });
        }
    }

    public static async updatePhysicalData(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid ID" });
            }

            const data = req.body;

            const updatedData = await physicalDataService.update(id, data);
            if (!updatedData) {
                return res.status(404).json({ status: "Failed", message: "Data not found" });
            }

            return res.json({
                status: "Success",
                message: "Data updated",
                data: updatedData
            });
        } catch (error: any) {
            return res.status(500).json({ status: "Faile", message: error.message });
        }
    }

    public static async deletePhysicalData(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid ID" });
            }

            const deletedCount = await physicalDataService.delete(id);
            if (deletedCount === 0) {
                return res.status(404).json({ status: "Failed", message: "Data not found" });
            }

            return res.status(200).json({ status: "Success", message: "Data deleted successfully" });
        } catch (error: any) {
            return res.status(500).json({ status: "Success", message: error.message });
        }
    }
}