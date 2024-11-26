import BaseModel from "./Model";

export type PhysicalDataType = {
    id: number;
    user_id: number | undefined;
    weight: number;
    height: number;
    daily_activity: string;
    target_calory: number | null;
    target_protein: number | null;
    created_at: Date;
    updated_at: Date;
}

export class PhysicalDataModel extends BaseModel {
    static tableName: string = "physical_datas";

    id!: number;
    user_id!: number | undefined;
    weight!: number;
    height!: number;
    daily_activity!: string;
    target_calory!: number | null;
    target_protein!: number | null;
}