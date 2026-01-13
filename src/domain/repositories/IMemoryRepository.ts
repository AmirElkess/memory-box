import { Memory, CreateMemoryDTO } from "../../domain/entities/Memory";

export interface IMemoryRepository {
  getAll(): Promise<Memory[]>;
  getById(id: number): Promise<Memory | null>;
  getBySentiment(sentiment: string): Promise<Memory[]>;
  create(memory: CreateMemoryDTO): Promise<Memory>;
  addComment(memoryId: number, comment: string): Promise<Memory>;
}