import { Injectable } from '@angular/core';
import {
  TaskColumnRequest,
  TaskColumnResponse,
  TaskColumType,
} from '../models/TaskColumn.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CardRequest, CardType } from '../models/Card.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagType } from '../models/Tag.model';

@Injectable({
  providedIn: 'root',
})
export class TaskColumnsService {
  private apiUrl = 'http://localhost:9000/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  uuid: string = uuidv4();
  allData!: TaskColumnResponse[];
  selectedFilters: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  selectedFilters$: Observable<string[]> = this.selectedFilters.asObservable();

  taskColumns: BehaviorSubject<TaskColumnResponse[]> = new BehaviorSubject<
    TaskColumnResponse[]
  >([]);
  taskColumns$: Observable<TaskColumnResponse[]> =
    this.taskColumns.asObservable();

  constructor(private http: HttpClient) {
    this.loadColumnsData();
  }

  loadColumnsData() {
    this.http
      .get<TaskColumnResponse[]>(`${this.apiUrl}/columns`)
      .subscribe((data) => {
        this.allData = data;
        this.taskColumns.next(data);
      });
  }

  getData() {
    return this.taskColumns$;
  }

  // ================ COLUMNS OPERATIONS =======================

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

    return this.http
      .put(`${this.apiUrl}/columns/${columnId}`, updatedColumn)
      .pipe(tap(() => this.loadColumnsData()));
  }

  deleteColumn(id: string) {
    return this.http
      .delete(`${this.apiUrl}/columns/${id}`)
      .pipe(tap(() => this.loadColumnsData()));
  }

  // ================ CARDS OPERATIONS =======================

  getTags(tags: TagType[]) {
    return tags.map((tag) => {
      return tag.id;
    });
  }

  addNewCard(card: CardRequest, columnID: string) {
    const tagsId = this.getTags(card.tags);

    const newCard = {
      ...card,
      tags: tagsId,
      column_id: columnID,
    };

    return this.http
      .post<CardRequest>(`${this.apiUrl}/cards`, newCard, this.httpOptions)
      .pipe(tap(() => this.loadColumnsData()));
  }

  updateCard(card: CardType, columnID: string) {
    const tagsId = this.getTags(card.tags);

    const updatedCard = {
      ...card,
      tags: tagsId,
      column_id: columnID,
    };

    return this.http
      .put<CardType>(
        `${this.apiUrl}/cards/${card.id}`,
        updatedCard,
        this.httpOptions
      )
      .pipe(tap(() => this.loadColumnsData()));
  }

  deleteCard(cardID: string) {
    return this.http
      .delete(`${this.apiUrl}/cards/${cardID}`)
      .pipe(tap(() => this.loadColumnsData()));
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
    // this.sortData();
  }

  // sortData() {
  //   if (this.selectedFilters.getValue().length === 0) {
  //     this.taskColumns.next(this.allData);
  //   } else {
  //     this.taskColumns.next(this.allData);
  //     const sortedTaskColumns = this.taskColumns.getValue().map((column) => {
  //       return {
  //         ...column,
  //         cards: column.cards.filter((card) => {
  //           const tags = card.tags;

  //           for (let i = 0; i < tags.length; i++) {
  //             if (this.selectedFilters.getValue().includes(tags[i].id)) {
  //               return true;
  //             }
  //           }
  //           return false;
  //         }),
  //       };
  //     });
  //     this.taskColumns.next(sortedTaskColumns);
  //   }
  // }
}
