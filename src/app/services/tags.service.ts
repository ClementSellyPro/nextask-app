import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { TagRequest, TagType } from '../models/Tag.model';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private destroy$ = new Subject<void>();
  private apiUrl = 'http://localhost:9000/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  tagList: BehaviorSubject<TagType[]> = new BehaviorSubject<TagType[]>([]);
  tagList$: Observable<TagType[]> = this.tagList.asObservable();

  constructor(private http: HttpClient) {
    this.tagList$ = this.getTags();
  }

  refreshTagList() {
    this.tagList$ = this.getTags();
  }

  getTags(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tags`);
  }

  addNewTag(tag: TagType) {
    const tagWithoutId: TagRequest = {
      name: tag.name,
      color: tag.color,
    };

    return this.http
      .post(`${this.apiUrl}/tags`, tagWithoutId, this.httpOptions)
      .subscribe();
  }

  updateTag(updatedTag: TagType) {
    return this.http
      .put(`${this.apiUrl}/tags/${updatedTag.id}`, updatedTag, this.httpOptions)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          console.log('Success:', result);
          this.refreshTagList();
        },
        error: (error) => console.error('Error:', error),
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
