import { Request, Response } from "express";
import { FoodUserService } from "../../../services/FoodUserService";

const foodUserService = new FoodUserService();

export class FoodUserController {
    public static async get(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(404).json({ status: "Failed", message: "User id not found" })
            }

            const datas = await foodUserService.findByUserId(userId);

            return res.status(200).json({
                status: "success",
                message: "Food User successfully retrieved",
                data: datas
            })
        } catch (error: any) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    }

    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const userId = req.user?.id;

            if (!userId) {
                return res.status(404).json({ status: "Failed", message: "User id not found" })
            }

            if (!data.calory || !data.carbohydrate || !data.fat || !data.name || !data.protein) {
                return res.status(400).json({ status: "Failed", message: "Incomplete data" });
            }

            data.date = new Date();

            const newData = await foodUserService.create(userId, data);
            return res.status(201).json({
                status: "Success",
                message: "Data successfully created",
                data: newData
            });
        } catch (error: any) {
            return res.status(500).json({ status: 'Failed', message: error.message });
        }
    }

    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return res.status(400).json({ message: "Invalid ID" });
            }

            const deletedCount = await foodUserService.delete(id);
            if (deletedCount === 0) {
                return res.status(404).json({ status: "Failed", message: "Data not found" });
            }

            return res.status(200).json({ status: "Success", message: "Data deleted successfully" });
        } catch (error: any) {
            return res.status(500).json({ status: "Success", message: error.message });
        }
    }
}