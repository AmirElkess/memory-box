
import { Memory } from "../../domain/entities/Memory";
import { IMemoryRepository } from "../../domain/repositories/IMemoryRepository";

export class AddCommentUseCase {
  constructor(private repository: IMemoryRepository) {}

  async execute(memoryId: number, comment: string): Promise<Memory> {
    if (!comment.trim()) {
      throw new Error('Comment cannot be empty');
    }
    return await this.repository.addComment(memoryId, comment);
  }
}