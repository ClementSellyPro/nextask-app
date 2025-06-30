import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagType } from '../models/Tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  tagsList: BehaviorSubject<TagType[]> = new BehaviorSubject<TagType[]>([]);
  tagsList$: Observable<TagType[]> = this.tagsList.asObservable();

  constructor() {
    this.tagsList.next([
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
}
