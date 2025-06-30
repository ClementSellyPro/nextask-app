import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TagType } from '../../models/Tag.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-modal-update-tags',
  imports: [AsyncPipe, NgIf],
  templateUrl: './modal-update-tags.component.html',
  styleUrl: './modal-update-tags.component.css',
})
export class ModalUpdateTagsComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  tagsList$!: Observable<TagType[]>;

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.tagsList$ = this.tagsService.tagsList$;
  }

  onCloseModalUpdateTag() {
    this.closeModalEvent.emit(false);
  }

  onUpdateSelectedTags(id: string) {}

  onOpenAddNewTagModal() {}
}
