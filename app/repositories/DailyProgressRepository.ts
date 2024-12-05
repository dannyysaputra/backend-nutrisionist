import { DailyProgressModel, DailyProgressType } from "../models/DailyProgressModel";

export class DailyProgressRepository {
    public async get(): Promise<DailyProgressType[]> {
        return await DailyProgressModel.query();
    }

    public async findById(id: number): Promise<DailyProgressType | undefined> {
        return await DailyProgressModel.query().findOne({ id });
    }

    public async findByUserId(user_id: number): Promise<DailyProgressType[] | undefined> {
        return await DailyProgressModel.query()
            .where({ user_id });
    }

    public async findByDate(date: Date): Promise<DailyProgressType | undefined> {
        const formattedDate = date.toISOString().split('T')[0];
        return await DailyProgressModel.query().whereRaw('DATE(date) = ?', [formattedDate]).first();
    }

    public async create(data: Partial<DailyProgressType>): Promise<DailyProgressType> {
        return await DailyProgressModel.query().insert(data);
    }

    public async update(id: number, data: Partial<DailyProgressType>): Promise<DailyProgressType> {
        return await DailyProgressModel.query().patchAndFetchById(id, data);
    }

    public async delete(id: number): Promise<number> {
        return await DailyProgressModel.query().deleteById(id);
    }
}