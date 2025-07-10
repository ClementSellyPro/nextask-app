import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TaskColumnsService } from '../../services/task-columns.service';
import { CardType } from '../../models/Card.model';
import { TagsService } from '../../services/tags.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagType } from '../../models/Tag.model';
import { ModalUpdateTagsComponent } from '../modal-update-tags/modal-update-tags.component';

@Component({
  selector: 'app-modal-add-card',
  standalone: true,
  imports: [
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    CommonModule,
    DatePickerModule,
    DialogModule,
    ButtonModule,
    AsyncPipe,
    NgIf,
    ModalUpdateTagsComponent,
  ],
  templateUrl: './modal-add-card.component.html',
  styleUrl: './modal-add-card.component.css',
})
export class ModalAddCardComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Input() columnID!: string;
  @Input() cardToUpdate!: CardType;
  tagList$!: Observable<TagType[]>;
  isAddingNewTag: boolean = false;

  selectedTags: BehaviorSubject<TagType[]> = new BehaviorSubject<TagType[]>([]);
  selectedTags$: Observable<TagType[]> = this.selectedTags.asObservable();

  cardForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    limitDate: new FormControl(),
    storyPoints: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private taskColumnsService: TaskColumnsService,
    private tagsService: TagsService
  ) {}

  ngOnInit(): void {
    this.tagList$ = this.tagsService.tagList$;
    this.selectedTags.next(this.cardToUpdate.tags);

    if (this.cardToUpdate) {
      this.cardForm.patchValue({
        title: this.cardToUpdate.title,
        limitDate: this.cardToUpdate.limitDate,
        storyPoints: this.cardToUpdate.storyPoints,
        description: this.cardToUpdate.description,
      });
    }
  }

  isTagSelected(tag: TagType) {
    return this.cardToUpdate.tags.some((t) => t.id === tag.id) ?? false;
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  onCancel() {
    this.closeModal.emit();
  }

  onAddNewCard() {
    if (this.cardForm.valid) {
      const formData = this.cardForm.value;

      const newCard: CardType = {
        id: '',
        title: formData.title!,
        description: formData.description!,
        tags: this.selectedTags.getValue(),
        limitDate: formData.limitDate!,
        storyPoints: formData.storyPoints!,
      };

      this.taskColumnsService.addNewCard(newCard, this.columnID);
      this.closeModal.emit();
    } else {
      this.cardForm.markAllAsTouched();
    }
  }

  openModalUpdateTag() {
    this.isAddingNewTag = true;
  }

  closeModalUpdateTag() {
    this.isAddingNewTag = false;
  }

  updateSelectedTags(tags: TagType[]): void {
    this.selectedTags.next(tags);
  }

  onUpdateCard(id: string) {
    const formData = this.cardForm.value;

    const updatedCard: CardType = {
      id: id,
      title: formData.title!,
      description: formData.description!,
      tags: this.selectedTags.getValue(),
      limitDate: formData.limitDate!,
      storyPoints: formData.storyPoints!,
    };

    this.taskColumnsService.updateCard(updatedCard, this.columnID);
    this.closeModal.emit();
  }

  ondeleteCard(id: string) {
    this.taskColumnsService.deleteCard(id, this.columnID);
    this.closeModal.emit();
  }
}
