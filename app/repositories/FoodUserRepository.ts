import { FoodUserModel, FoodUserType } from "../models/FoodUserModel";

export class FoodUserRepository {
    public async get(): Promise<FoodUserType[]> {
        return await FoodUserModel.query();
    }

    public async findById(id: number): Promise<FoodUserType | undefined> {
        return await FoodUserModel.query().findOne({ id });
    }

    public async findByUserId(user_id: number): Promise<FoodUserType[] | undefined> {
        return await FoodUserModel.query()
            .where({ user_id });
    }

    public async findByDailyProgressId(daily_progress_id: number): Promise<FoodUserType[] | undefined> {
        return await FoodUserModel.query()
            .where({ daily_progress_id });
    }

    public async create(data: Partial<FoodUserType>): Promise<FoodUserType> {
        return await FoodUserModel.query().insert(data);
    }

    public async update(id: number, data: Partial<FoodUserType>): Promise<FoodUserType> {
        return await FoodUserModel.query().patchAndFetchById(id, data);
    }

    public async delete(id: number): Promise<number> {
        return await FoodUserModel.query().deleteById(id);
    }
}