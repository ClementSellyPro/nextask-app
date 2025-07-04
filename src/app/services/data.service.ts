import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { TagType } from '../models/Tag.model';
import { TaskColumType } from '../models/TaskColumn.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  columnsData$!: Observable<TaskColumType[]>;
  tagsData$!: Observable<TagType[]>;

  constructor(private http: HttpClient) {}

  getColumsData(): Observable<TaskColumType[]> {
    if (!this.columnsData$) {
      this.columnsData$ = this.http
        .get<TaskColumType[]>('assets/data/tasks.json')
        .pipe(shareReplay(1));
    }
    return this.columnsData$;
  }

  getTagsData(): Observable<TagType[]> {
    if (!this.tagsData$) {
      this.tagsData$ = this.http
        .get<TagType[]>('assets/data/tags.json')
        .pipe(shareReplay(1));
    }
    return this.tagsData$;
  }
}
