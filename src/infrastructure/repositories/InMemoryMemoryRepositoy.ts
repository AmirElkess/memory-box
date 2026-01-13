import { IMemoryRepository } from "../../domain/repositories/IMemoryRepository";
import { Memory, CreateMemoryDTO } from "../../domain/entities/Memory";

export class InMemoryMemoryRepository implements IMemoryRepository {
  private memories: Memory[] = [];

  async getAll(): Promise<Memory[]> {
    return [...this.memories];
  }

  async getById(id: number): Promise<Memory | null> {
    return this.memories.find(m => m.id === id) || null;
  }

  async getBySentiment(sentiment: string): Promise<Memory[]> {
    return this.memories.filter(m => m.sentiment === sentiment);
  }

  async create(dto: CreateMemoryDTO): Promise<Memory> {
    const memory: Memory = {
      id: Date.now(),
      text: dto.text,
      sentiment: dto.sentiment,
      date: new Date().toISOString().split('T')[0],
      image: dto.image,
      comments: []
    };
    this.memories.unshift(memory);
    return memory;
  }

  async addComment(memoryId: number, comment: string): Promise<Memory> {
    const memory = this.memories.find(m => m.id === memoryId);
    if (!memory) throw new Error('Memory not found');
    memory.comments.push(comment);
    return memory;
  }
}