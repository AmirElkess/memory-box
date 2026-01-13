import { Memory, CreateMemoryDTO } from "../../domain/entities/Memory";
import { IMemoryRepository } from "../../domain/repositories/IMemoryRepository";

export class CreateMemoryUseCase {
  constructor(private repository: IMemoryRepository) {}

  async execute(dto: CreateMemoryDTO): Promise<Memory> {
    if (!dto.text || !dto.sentiment) {
      throw new Error('Text and sentiment are required');
    }
    return await this.repository.create(dto);
  }
}