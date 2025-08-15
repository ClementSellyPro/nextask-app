import { TagType } from './Tag.model';

export interface CardType {
  id: string;
  title: string;
  description: string;
  limitDate: Date;
  storyPoints: string;
  tags: TagType[];
  position: number;
  isCompleted: boolean;
}

export interface CardRequest {
  title: string;
  description: string;
  limitDate: Date;
  storyPoints: string;
  tags: TagType[];
}

export interface CardResponse {
  id: string;
  title: string;
  description: string;
  limitDate: Date;
  storyPoints: string;
  tags: TagType[];
  columnId: string;
  project_id: string;
  position: number;
  isCompleted: boolean;
}
