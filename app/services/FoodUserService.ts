import { DailyProgressType } from "../models/DailyProgressModel";
import { FoodUserType } from "../models/FoodUserModel";
import { DailyProgressRepository } from "../repositories/DailyProgressRepository";
import { FoodUserRepository } from "../repositories/FoodUserRepository";
import { UserRepository } from "../repositories/UserRepository";

export class FoodUserService {
    private foodUserRepository: FoodUserRepository;
    private dailyProgressRepository: DailyProgressRepository;
    private userRepository: UserRepository

    constructor() {
        this.foodUserRepository = new FoodUserRepository();
        this.dailyProgressRepository = new DailyProgressRepository();
        this.userRepository = new UserRepository();
    }

    public async getAll(): Promise<FoodUserType[]> {
        return this.foodUserRepository.get();
    }

    public async findById(id: number): Promise<FoodUserType | undefined> {
        return this.foodUserRepository.findById(id);
    }
    
    public async findByUserId(userId: number): Promise<FoodUserType[] | undefined> {
        return this.foodUserRepository.findByUserId(userId);
    }

    public async findByDailyProgressId(daily_progress_id: number): Promise<FoodUserType[] | undefined> {
        return this.foodUserRepository.findByDailyProgressId(daily_progress_id);
    }

    public async create(userId: number, data: Partial<FoodUserType>): Promise<FoodUserType> {
        if (!data.calory || !data.carbohydrate || !data.fat || !data.name || !data.protein || !data.date) {
            throw new Error('Incomplete data')
        }

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found')
        }

        let dailyProgress = await this.dailyProgressRepository.findByDate(data.date!);

        // Jika tidak ada, buat daily_progress baru
        if (!dailyProgress) {
            dailyProgress = await this.dailyProgressRepository.create({
                user_id: userId,
                date: data.date,
                consumed_protein: 0, 
                consumed_calory: 0,
            });
        }

        const newFoodUser = await this.foodUserRepository.create({
            ...data,
            user_id: userId,
            daily_progress_id: dailyProgress.id,
        });

        await this.dailyProgressRepository.update(dailyProgress.id, {
            consumed_protein: dailyProgress.consumed_protein + (data.protein || 0),
            consumed_calory: dailyProgress.consumed_calory + (data.calory || 0),
        })

        return newFoodUser;
    }

    public async delete(foodUserId: number): Promise<number> {
        const foodUser = await this.foodUserRepository.findById(foodUserId);
        if (!foodUser) {
            throw new Error('Food user not found');
        }
    
        const dailyProgress = await this.dailyProgressRepository.findById(foodUser.daily_progress_id);
        if (!dailyProgress) {
            throw new Error('Associated daily progress not found');
        }
    
        const updatedProtein = dailyProgress.consumed_protein - (foodUser.protein || 0);
        const updatedCalory = dailyProgress.consumed_calory - (foodUser.calory || 0);
    
        await this.dailyProgressRepository.update(dailyProgress.id, {
            consumed_protein: Math.max(0, updatedProtein), 
            consumed_calory: Math.max(0, updatedCalory),  
        });
    
        return this.foodUserRepository.delete(foodUserId);
    }
    
}