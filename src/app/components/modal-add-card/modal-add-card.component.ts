import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { TaskColumType } from '../../models/TaskColumn.model';

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
  ],
  templateUrl: './modal-add-card.component.html',
  styleUrl: './modal-add-card.component.css',
})
export class ModalAddCardComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Input() columnID!: string;

  cardForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    limitDate: new FormControl(null),
    storyPoints: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private taskColumnsService: TaskColumnsService) {}

  onDateLimitSelection() {
    console.log(this.cardForm.value.limitDate);
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
      console.log('Données du formulaire:', formData);
      const newCard: CardType = {
        id: '',
        title: formData.title!,
        description: formData.description!,
        tags: [],
        limitDate: formData.limitDate!,
        storyPoints: formData.storyPoints!,
      };

      this.taskColumnsService.addNewCard(newCard, this.columnID);
      this.closeModal.emit();
    } else {
      this.cardForm.markAllAsTouched();
    }
  }
}
