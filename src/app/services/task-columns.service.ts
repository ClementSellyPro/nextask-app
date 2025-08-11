import { Injectable } from '@angular/core';
import {
  TaskColumnRequest,
  TaskColumnResponse,
  TaskColumType,
} from '../models/TaskColumn.model';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CardRequest, CardResponse, CardType } from '../models/Card.model';
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
    this.loadCards();
  }

  loadColumnsData() {
    this.http
      .get<TaskColumnResponse[]>(`${this.apiUrl}/columns`)
      .subscribe((data) => {
        this.allData = data;
        this.taskColumns.next(data);
      });
  }

  getColumnData() {
    return this.taskColumns$;
  }

  // ================ COLUMNS OPERATIONS =======================

  addNewColumn(name: string, color: string): Observable<TaskColumType> {
    const newColumn: TaskColumnRequest = {
      name: name,
      color: color,
      projectId: null,
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
  cardList: BehaviorSubject<CardResponse[]> = new BehaviorSubject<
    CardResponse[]
  >([]);
  cardList$: Observable<CardResponse[]> = this.cardList.asObservable();

  getTags(tags: TagType[]) {
    return tags.map((tag) => {
      return tag.id;
    });
  }

  loadCards() {
    this.http.get<CardResponse[]>(`${this.apiUrl}/cards`).subscribe((data) => {
      this.cardList.next(data);
    });
  }

  getCards() {
    return this.cardList$;
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
      .put<CardResponse>(`${this.apiUrl}/cards/${card.id}`, updatedCard)
      .pipe(
        tap(() => {
          this.loadColumnsData();
        }),
        catchError((error) => {
          console.error('update error: ', error);
          throw error;
        })
      );
  }

  deleteCard(cardID: string) {
    return this.http.delete(`${this.apiUrl}/cards/${cardID}`).pipe(
      tap(() => this.loadCards()),
      catchError((error) => {
        console.error('delete error: ', error);
        throw error;
      })
    );
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
