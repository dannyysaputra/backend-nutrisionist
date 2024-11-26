import { UserModel, UserType } from "../models/UserModel";

export class UserRepository {
    public async findByEmail(email: string): Promise<UserType | undefined> {
        return await UserModel.query().findOne({ email });
    }

    public async findById(id: number): Promise<UserType | undefined> {
        return await UserModel.query().findById(id);
    }

    public async createUser(user: Partial<UserType>): Promise<UserType> {
        return await UserModel.query().insert(user);
    }

    public async updateUser(id: number, user: Partial<UserType>): Promise<UserType> {
        return await UserModel.query().patchAndFetchById(id, user);
    }

    public async deleteUser(id: number): Promise<number> {
        return await UserModel.query().deleteById(id);
    }
}