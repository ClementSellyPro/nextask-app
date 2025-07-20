import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagType } from '../models/Tag.model';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private apiUrl = 'http://localhost:9000/api';

  tagList: BehaviorSubject<TagType[]> = new BehaviorSubject<TagType[]>([]);
  tagList$: Observable<TagType[]> = this.tagList.asObservable();

  constructor(private dataService: DataService, private http: HttpClient) {
    this.dataService.getTagsData().subscribe((data) => {
      this.tagList.next(data);
    });
  }

  getTags(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tags`);
  }

  addNewTag(tag: TagType) {
    const newTag = { ...tag, id: uuidv4() };
    const updatedTagList = [...this.tagList.getValue(), newTag];

    this.tagList.next(updatedTagList);
  }

  updateTag(updatedTag: TagType) {
    const updatedTagList = this.tagList.getValue().map((tag) => {
      if (tag.id === updatedTag.id) {
        return updatedTag;
      }
      return tag;
    });
    this.tagList.next(updatedTagList);
  }
}
