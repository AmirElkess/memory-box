import { IMemoryRepository } from "../../domain/repositories/IMemoryRepository";
import { Memory, CreateMemoryDTO } from "../../domain/entities/Memory";

export class InMemoryMemoryRepository implements IMemoryRepository {
  private memories: Memory[] = [
    {
      id: 1,
      text: 'First day at the new coffee shop downtown. The smell of freshly roasted beans and the warm sunlight made it perfect.',
      sentiment: '☕',
      date: '2024-01-15',
      image: null,
      comments: []
    },
    {
      id: 2,
      text: 'Beach sunset with friends. The sky was painted in shades of orange and pink.',
      sentiment: '😊',
      date: '2024-02-20',
      image: null,
      comments: ['Best evening ever!']
    }
  ];

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