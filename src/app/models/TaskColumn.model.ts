import { CardType } from './Card.model';

export interface TaskColumType {
  id: string;
  name: string;
  color: string;
  cards: CardType[];
}
