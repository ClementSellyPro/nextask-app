import { TagType } from './Tag.model';

export interface CardType {
  id: string;
  tags: TagType[];
  title: string;
  description: string;
  limitDate: Date;
  storyPoints: string;
}
