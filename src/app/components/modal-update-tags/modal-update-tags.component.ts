import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagType } from '../../models/Tag.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { TagsService } from '../../services/tags.service';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-modal-update-tags',
  imports: [
    AsyncPipe,
    FormsModule,
    ColorPickerModule,
    NgIf,
    ClickOutsideDirective,
  ],
  templateUrl: './modal-update-tags.component.html',
  styleUrl: './modal-update-tags.component.css',
})
export class ModalUpdateTagsComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() addedTagsEvent = new EventEmitter<TagType[]>();
  @Input() currentTags!: TagType[];
  tagList$!: Observable<TagType[]>;
  isAddingNewTag: boolean = false;
  isUpdatingTag: boolean = false;
  tagToUpdateID!: string;
  selectedTags: TagType[] = [];
  isModalOpen: boolean = false;

  storeSelectedTags: BehaviorSubject<TagType[]> = new BehaviorSubject<
    TagType[]
  >([]);
  storeSelectedTags$: Observable<TagType[]> =
    this.storeSelectedTags.asObservable();

  newTagTitle!: string;
  newTagColor!: string;

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.tagList$ = this.tagsService.getTags();
    if (this.currentTags) {
      this.selectedTags = this.currentTags;
    }
  }

  onToggleTagModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  onCloseModalUpdateTag() {
    this.isModalOpen = false;
    // this.closeModalEvent.emit(false);
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

  closeAddNewTagModal() {
    this.isAddingNewTag = false;
  }

  onAddNewTag() {
    const newTag: TagType = {
      id: '',
      name: this.newTagTitle,
      color: this.newTagColor,
    };

    if (newTag.name) {
      this.tagsService.addNewTag(newTag);
      this.resetAddTagForm();
      this.closeAddNewTagModal();
    }
  }

  onUpdateTag(id: string, name: string, color: string) {
    this.newTagTitle = name;
    this.newTagColor = color;
    this.isUpdatingTag = true;
    this.onOpenAddNewTagModal();
    this.tagToUpdateID = id;
  }

  updateTag() {
    const updatedTag = {
      id: this.tagToUpdateID,
      name: this.newTagTitle,
      color: this.newTagColor,
    };
    this.tagsService.updateTag(updatedTag);
    this.resetAddTagForm();
    this.closeAddNewTagModal();
  }

  updateSelectedTags(tags: TagType[]): void {
    this.storeSelectedTags.next(tags);
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

  resetAddTagForm() {
    this.newTagTitle = '';
    this.newTagColor = '';
  }
}
