import { Component, Input } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ModalAddCardComponent } from '../modal-add-card/modal-add-card.component';
import { NgIf } from '@angular/common';
import { TaskColumType } from '../../models/TaskColumn.model';
import { OptionColumnComponent } from '../option-column/option-column.component';
import { TaskColumnsService } from '../../services/task-columns.service';

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

  constructor(private taskColumnService: TaskColumnsService) {}

  onOpenModal() {
    this.isModalTaskOpen = true;
  }

  handleCloseModal() {
    console.log('Parent: Événement reçu avec valeur:');
    this.isModalTaskOpen = false;
  }

  handleDeleteColumn(id: string) {
    this.taskColumnService.deleteColumn(id);
  }
}
