import { Memory } from "../../domain/entities/Memory";
import { IMemoryRepository } from "../../domain/repositories/IMemoryRepository";

export class GetMemoryBySentimentUseCase {
  constructor(private repository: IMemoryRepository) {}

  async execute(sentiment: string): Promise<Memory | null> {
    const memories = await this.repository.getBySentiment(sentiment);
    if (memories.length === 0) return null;
    return memories[Math.floor(Math.random() * memories.length)];
  }
}