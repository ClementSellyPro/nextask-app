import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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

  cardForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    limitDate: new FormControl(null),
    storyPoints: new FormControl(''),
    description: new FormControl(''),
  });

  onDateLimitSelection() {
    console.log(this.cardForm.value.limitDate);
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  onCancel() {
    this.closeModal.emit();
  }

  onSave() {
    if (this.cardForm.valid) {
      const formData = this.cardForm.value;
      console.log('Données du formulaire:', formData);

      this.closeModal.emit();
    } else {
      this.cardForm.markAllAsTouched();
    }
  }
}
