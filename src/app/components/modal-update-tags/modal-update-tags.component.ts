import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TagType } from '../../models/Tag.model';
import { AsyncPipe } from '@angular/common';
import { TagsService } from '../../services/tags.service';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-update-tags',
  imports: [AsyncPipe, FormsModule, ColorPickerModule],
  templateUrl: './modal-update-tags.component.html',
  styleUrl: './modal-update-tags.component.css',
})
export class ModalUpdateTagsComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() addedTagsEvent = new EventEmitter<TagType[]>();
  @Input() currentTags!: TagType[];
  tagList$!: Observable<TagType[]>;
  isAddingNewTag: boolean = false;
  selectedTags: TagType[] = [];

  newTagTitle!: string;
  newTagColor!: string;

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.tagList$ = this.tagsService.tagList$;
    if (this.currentTags) {
      this.selectedTags = this.currentTags;
    }
  }

  onCloseModalUpdateTag() {
    this.closeModalEvent.emit(false);
  }

  onUpdateSelectedTags(clickedID: string) {
    const selectedTag = this.tagsService.tagList
      .getValue()
      .find((tag) => tag.id === clickedID);

    if (this.selectedTags.length === 0) {
      this.selectedTags.push(selectedTag!);
    } else {
      if (!this.selectedTags.some((tag) => tag.id === clickedID)) {
        this.selectedTags.push(selectedTag!);
      } else {
        const itemIndex = this.selectedTags.findIndex(
          (tag) => tag.id === clickedID
        );
        this.selectedTags.splice(itemIndex, 1);
      }
    }
    this.addedTagsEvent.emit(this.selectedTags);
  }

  onOpenAddNewTagModal() {
    this.isAddingNewTag = true;
  }

  onAddNewTag() {
    const newTag: TagType = {
      id: '',
      name: this.newTagTitle,
      color: this.newTagColor,
    };

    if (newTag.name) {
      this.tagsService.addNewTag(newTag);
      this.isAddingNewTag = false;
    }
  }

  isTagSelected(tag: TagType) {
    let isTagSelected = false;
    this.selectedTags.forEach((currentTag) => {
      if (currentTag.id === tag.id) {
        isTagSelected = true;
      }
    });
    return isTagSelected;
  }
}
