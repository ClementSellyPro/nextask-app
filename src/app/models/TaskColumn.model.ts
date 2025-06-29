import { CardType } from './Card.model';

export interface TaskColumType {
  name: string;
  color: string;
  cards: CardType[];
}
