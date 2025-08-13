import { Component, Input, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ModalAddCardComponent } from '../modal-add-card/modal-add-card.component';
import { NgIf } from '@angular/common';
import { TaskColumnWithCards } from '../../models/TaskColumn.model';
import { OptionColumnComponent } from '../option-column/option-column.component';
import { TaskColumnsService } from '../../services/task-columns.service';
import { CardResponse } from '../../models/Card.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [
    TaskCardComponent,
    ModalAddCardComponent,
    NgIf,
    OptionColumnComponent,
    DragDropModule,
  ],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.css',
})
export class TaskColumnComponent implements OnInit {
  apiUrl: string = 'http://localhost:9000/api';

  isModalTaskOpen: boolean = false;
  @Input() columnData!: TaskColumnWithCards;
  @Input() connectedLists!: string[];

  constructor(private taskColumnService: TaskColumnsService) {}

  ngOnInit(): void {}

  onOpenModal() {
    this.isModalTaskOpen = true;
  }

  handleCloseModal() {
    this.isModalTaskOpen = false;
  }

  handleDeleteColumn(id: string) {
    console.log(id);
    this.taskColumnService.deleteColumn(id).subscribe();
    this.isModalTaskOpen = false;
  }

  drop(event: CdkDragDrop<CardResponse[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedCard = event.container.data[event.currentIndex];
      if (movedCard) {
        this.taskColumnService
          .updateCardPosition(movedCard.id, event.currentIndex)
          .subscribe({
            error: (err) => {
              console.error('Erreur update position : ', err);
            },
          });
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedCard = event.container.data[event.currentIndex];
      if (movedCard) {
        movedCard.columnId = this.columnData.id;

        this.taskColumnService
          .moveCardToColumn(
            movedCard.id,
            this.columnData.id,
            event.currentIndex
          )
          .subscribe({
            error: (err) => {
              console.error('Erreur déplacement colonne: ', err);
            },
          });
      }
    }
  }
}
