import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { TagRequest, TagType } from '../models/Tag.model';
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
    this.loadTags();
  }

  loadTags() {
    this.http.get<TagType[]>(`${this.apiUrl}/tags`).subscribe((tags) => {
      this.tagList.next(tags);
    });
  }

  getTags(): Observable<TagType[]> {
    return this.tagList$;
  }

  addNewTag(tag: TagType): Observable<TagType> {
    const tagWithoutId: TagRequest = {
      name: tag.name,
      color: tag.color,
    };

    return this.http
      .post<TagType>(`${this.apiUrl}/tags`, tagWithoutId, this.httpOptions)
      .pipe(tap(() => this.loadTags()));
  }

  updateTag(updatedTag: TagType) {
    return this.http
      .put(`${this.apiUrl}/tags/${updatedTag.id}`, updatedTag, this.httpOptions)
      .pipe(takeUntil(this.destroy$))
      .pipe(tap(() => this.loadTags()));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
