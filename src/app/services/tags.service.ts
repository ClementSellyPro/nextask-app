import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagType } from '../models/Tag.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  tagList: BehaviorSubject<TagType[]> = new BehaviorSubject<TagType[]>([]);
  tagList$: Observable<TagType[]> = this.tagList.asObservable();

  constructor() {
    this.tagList.next([
      {
        id: 'fdshfdsf',
        name: 'Frontend',
        color: '#7CB518',
      },
      {
        id: 'fdshdsf',
        name: 'Design',
        color: '#FFD500',
      },
    ]);
  }

  addNewTag(tag: TagType) {
    const newTag = { ...tag, id: uuidv4() };
    const updatedTagList = [...this.tagList.getValue(), newTag];

    this.tagList.next(updatedTagList);
  }
}
