import { PhysicalDataModel, PhysicalDataType } from "../models/PhysicalDataModel";

export class PhysicalDataRepository {
    public async get(): Promise<PhysicalDataType[]> {
        return await PhysicalDataModel.query();
    }

    public async findById(id: number): Promise<PhysicalDataType | undefined> {
        return await PhysicalDataModel.query().findOne({ id });
    }

    public async findByUserId(user_id: number): Promise<PhysicalDataType | undefined> {
        return await PhysicalDataModel.query().findOne({ user_id });
    }

    public async create(data: Partial<PhysicalDataType>): Promise<PhysicalDataType> {
        return await PhysicalDataModel.query().insert(data);
    }

    public async update(id: number, data: Partial<PhysicalDataType>): Promise<PhysicalDataType> {
        return await PhysicalDataModel.query().patchAndFetchById(id, data);
    }

    public async delete(id: number): Promise<number> {
        return await PhysicalDataModel.query().deleteById(id);
    }
}