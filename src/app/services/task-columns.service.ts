import { Injectable } from '@angular/core';
import { TaskColumType } from '../models/TaskColumn.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CardType } from '../models/Card.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class TaskColumnsService {
  uuid: string = uuidv4();
  selectedFilters: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  selectedFilters$: Observable<string[]> = this.selectedFilters.asObservable();

  taskColumns: BehaviorSubject<TaskColumType[]> = new BehaviorSubject<
    TaskColumType[]
  >([]);
  taskColumns$: Observable<TaskColumType[]> = this.taskColumns.asObservable();

  constructor(private dataService: DataService) {
    this.dataService.getColumsData().subscribe((data) => {
      this.taskColumns.next(data);
    });
  }

  getData() {
    return this.taskColumns;
  }

  addNewColumn(name: string, color: string) {
    const newColumn: TaskColumType = {
      id: uuidv4(),
      name: name,
      color: color,
      cards: [],
    };
    const updatedColumnList = [...this.taskColumns.getValue(), newColumn];

    this.taskColumns.next(updatedColumnList);
  }

  addNewCard(card: CardType, columnID: string) {
    const newCard: CardType = {
      ...card,
      id: uuidv4(),
    };

    const currentColumns: TaskColumType[] = this.taskColumns.getValue();
    const updatedColumns: TaskColumType[] = currentColumns.map((column) => {
      if (column.id === columnID) {
        return {
          ...column,
          cards: [...column.cards, newCard],
        };
      }
      return column;
    });

    this.taskColumns.next(updatedColumns);
  }

  updateCard(card: CardType, columnID: string) {
    const updatedColumns: TaskColumType[] = this.taskColumns
      .getValue()
      .map((currentColumn) => {
        if (currentColumn.id === columnID) {
          return {
            ...currentColumn,
            cards: currentColumn.cards.map((currentCard) => {
              if (currentCard.id === card.id) {
                return { ...card };
              }
              return currentCard;
            }),
          };
        }
        return currentColumn;
      });

    this.taskColumns.next(updatedColumns);
  }

  deleteCard(cardID: string, columnID: string) {
    const updatedColumns: TaskColumType[] = this.taskColumns
      .getValue()
      .map((column) => {
        if (column.id === columnID) {
          return {
            ...column,
            cards: column.cards.filter((card) => card.id !== cardID),
          };
        }
        return column;
      });
    this.taskColumns.next(updatedColumns);
  }

  updateSelectedFilters(id: string) {
    if (this.selectedFilters.getValue().length === 0) {
      this.selectedFilters.next([id]);
    } else {
      if (!this.selectedFilters.getValue().includes(id)) {
        this.selectedFilters.next([...this.selectedFilters.getValue(), id]);
      } else {
        const updatedFilters = this.selectedFilters
          .getValue()
          .filter((tag) => tag !== id);
        this.selectedFilters.next(updatedFilters);
      }
    }
  }
}
