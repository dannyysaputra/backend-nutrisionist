import BaseModel from "./Model";

export type FoodUserType = {
    id: number;
    user_id: number;
    daily_progress_id: number;
    name: string;
    date: Date;
    calory: number;
    protein: number;
    carbohydrate: number;
    fat: number;
    created_at: Date;
    updated_at: Date;
}

export class FoodUserModel extends BaseModel {
    static tableName: string = "food_users";

    id!: number;
    user_id!: number;
    daily_progress_id!: number;
    name!: string;
    date!: Date;
    calory!: number;
    protein!: number;
    carbohydrate!: number;
    fat!: number;
}