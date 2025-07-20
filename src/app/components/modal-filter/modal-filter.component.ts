import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { Observable } from 'rxjs';
import { TagType } from '../../models/Tag.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { TaskColumnsService } from '../../services/task-columns.service';

@Component({
  selector: 'app-modal-filter',
  imports: [AsyncPipe, NgIf],
  templateUrl: './modal-filter.component.html',
  styleUrl: './modal-filter.component.css',
})
export class ModalFilterComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  tagsList$!: Observable<TagType[]>;
  selectedFilter!: string[];

  constructor(
    private tagsService: TagsService,
    private taskColumnsService: TaskColumnsService
  ) {}

  ngOnInit(): void {
    // this.tagsList$ = this.tagsService.tagList$;
    this.selectedFilter = this.taskColumnsService.selectedFilters.getValue();
    this.tagsList$ = this.tagsService.getTags();
  }

  onCloseModal() {
    this.closeModalEvent.emit();
  }

  updateSelectedFilter(id: string) {
    this.taskColumnsService.updateSelectedFilters(id);
  }

  isFilterSelected(id: string) {
    return this.selectedFilter.includes(id);
  }
}
