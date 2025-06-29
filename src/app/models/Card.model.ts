import { TagType } from './Tag.model';

export interface CardType {
  tags: TagType[];
  title: string;
  description: string;
  limitDate: Date;
  storyPoints: string;
}
