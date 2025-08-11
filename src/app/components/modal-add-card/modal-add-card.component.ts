import { AsyncPipe, CommonModule } from '@angular/common';
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
import { CardRequest, CardType } from '../../models/Card.model';
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
    ModalUpdateTagsComponent,
  ],
  templateUrl: './modal-add-card.component.html',
  styleUrl: './modal-add-card.component.css',
})
export class ModalAddCardComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
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
    this.tagList$ = this.tagsService.getTags();

    if (this.cardToUpdate) {
      this.selectedTags.next(this.cardToUpdate.tags);
      this.cardForm.patchValue({
        title: this.cardToUpdate.title,
        limitDate: this.cardToUpdate.limitDate,
        storyPoints: this.cardToUpdate.storyPoints,
        description: this.cardToUpdate.description,
      });
    }
  }

  isTagSelected(tag: TagType) {
    if (this.cardToUpdate) {
      return this.cardToUpdate.tags.some((t) => t.id === tag.id) ?? false;
    }
    return;
  }

  onCloseModal() {
    console.log("Modal: Tentative d'émission de l'événement");
    console.log('Modal: EventEmitter existe ?', !!this.closeModal);
    console.log(
      'Modal: EventEmitter observers:',
      this.closeModal.observers.length
    );
    this.closeModal.emit(true);
    console.log('Modal: Événement émis');
  }

  onCancel() {
    this.closeModal.emit();
  }

  onAddNewCard() {
    if (this.cardForm.valid) {
      const formData = this.cardForm.value;

      const newCard: CardRequest = {
        title: formData.title!,
        description: formData.description!,
        tags: this.selectedTags.getValue(),
        limitDate: formData.limitDate!,
        storyPoints: formData.storyPoints!,
      };

      this.taskColumnsService.addNewCard(newCard, this.columnID).subscribe({
        next: () => {
          this.taskColumnsService.loadCards();
        },
      });
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

    this.taskColumnsService.updateCard(updatedCard, this.columnID).subscribe({
      next: (response) => {
        this.taskColumnsService.loadCards();
        console.log(response);
      },
    });
    this.closeModal.emit();
  }

  ondeleteCard(id: string) {
    this.taskColumnsService.deleteCard(id).subscribe();
    this.closeModal.emit();
  }
}
