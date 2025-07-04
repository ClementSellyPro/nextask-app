import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagType } from '../models/Tag.model';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  tagList: BehaviorSubject<TagType[]> = new BehaviorSubject<TagType[]>([]);
  tagList$: Observable<TagType[]> = this.tagList.asObservable();

  constructor(private dataService: DataService) {
    this.dataService.getTagsData().subscribe((data) => {
      this.tagList.next(data);
    });
  }

  addNewTag(tag: TagType) {
    const newTag = { ...tag, id: uuidv4() };
    const updatedTagList = [...this.tagList.getValue(), newTag];

    this.tagList.next(updatedTagList);
  }
}
