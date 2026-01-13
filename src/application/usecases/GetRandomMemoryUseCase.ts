import { Memory } from "../../domain/entities/Memory";
import { IMemoryRepository } from "../../domain/repositories/IMemoryRepository";

export class GetRandomMemoryUseCase {
  constructor(private repository: IMemoryRepository) {}

  async execute(): Promise<Memory | null> {
    const memories = await this.repository.getAll();
    if (memories.length === 0) return null;
    return memories[Math.floor(Math.random() * memories.length)];
  }
}