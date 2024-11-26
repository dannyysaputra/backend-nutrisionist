import { PhysicalDataType } from "../models/PhysicalDataModel";
import { PhysicalDataRepository } from "../repositories/PhysicalDataRepository";
import { UserRepository } from "../repositories/UserRepository";

export class PhysicalDataService {
    private physicalDataRepository: PhysicalDataRepository;
    private userRepository: UserRepository;

    constructor() {
        this.physicalDataRepository = new PhysicalDataRepository();
        this.userRepository = new UserRepository();
    }

    public async getAll(): Promise<PhysicalDataType[]> {
        return this.physicalDataRepository.get();
    }

    public async findById(id: number): Promise<PhysicalDataType | undefined> {
        return this.physicalDataRepository.findById(id);
    }

    public async findByUserId(userId: number): Promise<PhysicalDataType | undefined> {
        return this.physicalDataRepository.findByUserId(userId);
    }

    public async create(userId: number, data: Partial<PhysicalDataType>): Promise<PhysicalDataType> {
        if (!data.weight || !data.height || !data.daily_activity) {
            throw new Error('Incomplete data.');
        }


        const user = await this.userRepository.findById(userId);
        if (!user || !user.dob || !user.gender) {
            throw new Error('User information is incomplete. Date of birth and gender are required.');
        }

        const currentDate = new Date();
        const dob = new Date(user.dob);
        const age = currentDate.getFullYear() - dob.getFullYear();

        const bmr = this.calculateBMR(data.weight, data.height, age, user?.gender);
        const targetCalory = this.calculateTDEE(bmr, data.daily_activity);
        const targetProtein = this.calculateProteinRequirement(data.weight);

        const newData: Partial<PhysicalDataType> = {
            ...data,
            user_id: user.id,
            target_calory: targetCalory,
            target_protein: targetProtein,
        };

        return this.physicalDataRepository.create(newData);
    }

    public async update(id: number, data: Partial<PhysicalDataType>): Promise<PhysicalDataType | null> {
        const existingData = await this.physicalDataRepository.findById(id);

        if (!existingData || !existingData.user_id) {
            throw new Error('Data not found');
        }

        const weight = data.weight ?? existingData.weight;
        const height = data.height ?? existingData.height;
        const dailyActivity = data.daily_activity ?? existingData.daily_activity;

        const user = await this.userRepository.findById(existingData.user_id);
        if (!user || !user.dob || !user.gender) {
            throw new Error('User information is incomplete. Date of birth and gender are required.');
        }

        const currentDate = new Date();
        const dob = new Date(user.dob);
        const age = currentDate.getFullYear() - dob.getFullYear();

        const bmr = this.calculateBMR(weight, height, age, user.gender);
        const targetCalory = this.calculateTDEE(bmr, dailyActivity);
        const targetProtein = this.calculateProteinRequirement(weight);

        const updatedData: Partial<PhysicalDataType> = {
            ...existingData,
            weight,
            height,
            daily_activity: dailyActivity,
            target_calory: targetCalory,
            target_protein: targetProtein,
        };

        return await this.physicalDataRepository.update(id, updatedData);
    }

    public async delete(id: number): Promise<number> {
        return this.physicalDataRepository.delete(id);
    }

    private calculateBMR(weight: number, height: number, age: number, gender: string): number {
        if (gender === 'male') {
            return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
    }

    private calculateTDEE(bmr: number, dailyActivity: string): number {
        const activityMultiplier: { [key: string]: number } = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9,
        };
        return bmr * (activityMultiplier[dailyActivity] || 1);
    }

    private calculateProteinRequirement(weight: number): number {
        return weight * 0.8; // Kebutuhan protein harian.
    }
}