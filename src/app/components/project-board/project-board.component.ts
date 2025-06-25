import { Component } from '@angular/core';
import { TaskColumnComponent } from '../task-column/task-column.component';

@Component({
  selector: 'app-project-board',
  imports: [TaskColumnComponent],
  templateUrl: './project-board.component.html',
  styleUrl: './project-board.component.css',
})
export class ProjectBoardComponent {
  isAddNewColumn: boolean = false;

  onClickNewColumn() {
    this.isAddNewColumn = true;
  }

  onCloseNewColumn() {
    this.isAddNewColumn = false;
  }

  onAddNewColumn() {}
}
