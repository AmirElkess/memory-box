export interface Memory {
  id: number;
  text: string;
  sentiment: string;
  date: string;
  image: string | null;
  comments: string[];
}

export interface CreateMemoryDTO {
  text: string;
  sentiment: string;
  image: string | null;
}