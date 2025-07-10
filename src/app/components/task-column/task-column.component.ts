import { Component, Input } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ModalAddCardComponent } from '../modal-add-card/modal-add-card.component';
import { NgIf } from '@angular/common';
import { TaskColumType } from '../../models/TaskColumn.model';
import { OptionColumnComponent } from '../option-column/option-column.component';

@Component({
  selector: 'app-task-column',
  imports: [
    TaskCardComponent,
    ModalAddCardComponent,
    NgIf,
    OptionColumnComponent,
  ],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.css',
})
export class TaskColumnComponent {
  isModalTaskOpen: boolean = false;
  @Input() columnData!: TaskColumType;

  onOpenModal() {
    this.isModalTaskOpen = true;
  }

  onCloseModal() {
    this.isModalTaskOpen = false;
  }
}
