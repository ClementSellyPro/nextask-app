import { Component } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ModalAddCardComponent } from '../modal-add-card/modal-add-card.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-column',
  imports: [TaskCardComponent, ModalAddCardComponent, NgIf],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.css',
})
export class TaskColumnComponent {
  isModalTaskOpen: boolean = false;

  onOpenModal() {
    this.isModalTaskOpen = true;
  }

  onCloseModal() {
    this.isModalTaskOpen = false;
  }
}
