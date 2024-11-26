import BaseModel from "./Model";

export type UserType = {
    id: number;
    email: string;
    username: string;
    password: string | null;
    dob: Date;
    gender: string;
    avatar: string | null;
    created_at: Date;
    updated_at: Date;
}

export class UserModel extends BaseModel {
    static tableName: string = "users";

    id!: number;
    email!: string;
    username!: string;
    password!: string | null; // null for update profile
    dob!: Date;
    gender!: string;
    avatar!: string | null;
}