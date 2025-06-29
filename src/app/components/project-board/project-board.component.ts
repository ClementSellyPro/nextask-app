import { Component } from '@angular/core';
import { TaskColumnComponent } from '../task-column/task-column.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-board',
  imports: [TaskColumnComponent, ColorPickerModule, FormsModule],
  templateUrl: './project-board.component.html',
  styleUrl: './project-board.component.css',
})
export class ProjectBoardComponent {
  isAddNewColumn: boolean = false;
  color: string = '#758bfd';
  title!: string;

  onClickNewColumn() {
    this.isAddNewColumn = true;
  }

  onCloseNewColumn() {
    this.isAddNewColumn = false;
  }

  onAddNewColumn() {}
}
