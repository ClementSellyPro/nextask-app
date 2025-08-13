import { CardResponse, CardType } from './Card.model';

export interface TaskColumType {
  id: string;
  name: string;
  color: string;
  cards: CardType[];
}

export interface TaskColumnRequest {
  name: string;
  color: string;
  projectId: null;
}

export interface TaskColumnResponse {
  id: string;
  name: string;
  color: string;
  projectId: string;
}

export interface TaskColumnWithCards {
  id: string;
  name: string;
  color: string;
  projectId: string;
  cards: CardResponse[];
  connectedLists: string[];
}
