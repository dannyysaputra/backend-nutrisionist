import { Request, Response } from "express";
import { DailyProgressService } from "../../../services/DailyProgressService";

const dailyProgressService = new DailyProgressService();

export class DailyProgressController {
    public static async get(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(404).json({ status: "Failed", message: "User id not found" })
            }

            const datas = await dailyProgressService.findByUserId(userId);

            return res.status(200).json({
                status: "success",
                message: "Daily progress was successfully retrieved",
                data: datas
            })
        } catch (error: any) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    }

    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(404).json({
                    status: "Failed",
                    message: "Not found"
                })
            }
            const data = await dailyProgressService.findById(parseInt(id));

            return res.status(200).json({
                status: "success",
                message: "Daily progress was successfully retrieved",
                data: data
            })
        } catch (error: any) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    }
}