import { DailyProgressType } from "../models/DailyProgressModel";
import { DailyProgressRepository } from "../repositories/DailyProgressRepository";

export class DailyProgressService {
    private dailyProgressRepository: DailyProgressRepository;

    constructor() {
        this.dailyProgressRepository = new DailyProgressRepository();
    }

    public async getAll(): Promise<DailyProgressType[]> {
        return this.dailyProgressRepository.get();
    }

    public async findById(id: number): Promise<DailyProgressType | undefined> {
        return this.dailyProgressRepository.findById(id);
    }

    public async findByUserId(userId: number): Promise<DailyProgressType[] | undefined> {
        return this.dailyProgressRepository.findByUserId(userId);
    }
}