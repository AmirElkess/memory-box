import { IMemoryRepository } from "../../domain/repositories/IMemoryRepository";
import { Memory, CreateMemoryDTO } from "../../domain/entities/Memory";

const STORAGE_KEY = 'memories';

export class InMemoryMemoryRepository implements IMemoryRepository {
  private memories: Memory[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.memories = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load memories from storage:', error);
      this.memories = [];
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.memories));
    } catch (error) {
      console.error('Failed to save memories to storage:', error);
    }
  }

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
    this.saveToStorage();
    return memory;
  }

  async addComment(memoryId: number, comment: string): Promise<Memory> {
    const memory = this.memories.find(m => m.id === memoryId);
    if (!memory) throw new Error('Memory not found');
    memory.comments.push(comment);
    this.saveToStorage();
    return memory;
  }
}