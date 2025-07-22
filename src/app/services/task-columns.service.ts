import { Injectable } from '@angular/core';
import { TaskColumnRequest, TaskColumType } from '../models/TaskColumn.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CardType } from '../models/Card.model';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskColumnsService {
  private apiUrl = 'http://localhost:9000/api';
  private headearOption = {
    header: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  uuid: string = uuidv4();
  allData!: TaskColumType[];
  selectedFilters: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  selectedFilters$: Observable<string[]> = this.selectedFilters.asObservable();

  taskColumns: BehaviorSubject<TaskColumType[]> = new BehaviorSubject<
    TaskColumType[]
  >([]);
  taskColumns$: Observable<TaskColumType[]> = this.taskColumns.asObservable();

  constructor(private http: HttpClient) {
    this.loadColumnsData();
  }

  loadColumnsData() {
    this.http
      .get<TaskColumType[]>(`${this.apiUrl}/columns`)
      .subscribe((data) => {
        this.allData = data;
        this.taskColumns.next(data);
      });
  }

  getData() {
    return this.taskColumns$;
  }

  addNewColumn(name: string, color: string): Observable<TaskColumType> {
    const newColumn: TaskColumnRequest = {
      name: name,
      color: color,
      cards: [],
    };

    return this.http
      .post<TaskColumType>(`${this.apiUrl}/columns`, newColumn)
      .pipe(tap(() => this.loadColumnsData()));
  }

  updateColumn(columnId: string, titleUpdate: string, colorUpdate: string) {
    const updatedColumn = { name: titleUpdate, color: colorUpdate };

    return this.http.put(`${this.apiUrl}/columns/${columnId}`, updatedColumn);
  }

  deleteColumn(id: string) {
    return this.http
      .delete(`${this.apiUrl}/columns/${id}`)
      .pipe(tap(() => this.loadColumnsData()));
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
    this.sortData();
  }

  sortData() {
    if (this.selectedFilters.getValue().length === 0) {
      this.taskColumns.next(this.allData);
    } else {
      this.taskColumns.next(this.allData);
      const sortedTaskColumns = this.taskColumns.getValue().map((column) => {
        return {
          ...column,
          cards: column.cards.filter((card) => {
            const tags = card.tags;

            for (let i = 0; i < tags.length; i++) {
              if (this.selectedFilters.getValue().includes(tags[i].id)) {
                return true;
              }
            }
            return false;
          }),
        };
      });
      this.taskColumns.next(sortedTaskColumns);
    }
  }
}
