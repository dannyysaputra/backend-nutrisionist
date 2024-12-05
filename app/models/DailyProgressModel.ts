import BaseModel from "./Model";

export type DailyProgressType = {
    id: number;
    user_id: number | undefined;
    date: Date;
    consumed_protein: number;
    consumed_calory: number;
    created_at: Date;
    updated_at: Date;
}

export class DailyProgressModel extends BaseModel {
    static tableName: string = "daily_progresses";

    id!: number;
    user_id!: number | undefined;
    date!: Date;
    consumed_protein!: number;
    consumed_calory!: number;
}