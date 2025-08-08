import { Component, OnInit } from '@angular/core';
import { TaskColumnComponent } from '../task-column/task-column.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { TaskColumnsService } from '../../services/task-columns.service';
import { Observable } from 'rxjs';
import { TaskColumnResponse } from '../../models/TaskColumn.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-board',
  imports: [TaskColumnComponent, ColorPickerModule, FormsModule, AsyncPipe],
  templateUrl: './project-board.component.html',
  styleUrl: './project-board.component.css',
})
export class ProjectBoardComponent implements OnInit {
  isAddNewColumn: boolean = false;
  color: string = '#758bfd';
  title!: string;
  taskColumns$!: Observable<TaskColumnResponse[]>;

  constructor(private taskColumnsService: TaskColumnsService) {}

  ngOnInit(): void {
    this.taskColumns$ = this.taskColumnsService.getColumnData();
  }

  onClickNewColumn() {
    this.isAddNewColumn = true;
  }

  onCloseNewColumn() {
    this.resetAddColumnForm();
    this.isAddNewColumn = false;
  }

  onAddNewColumn() {
    if (this.title) {
      this.taskColumnsService.addNewColumn(this.title, this.color).subscribe();
      this.isAddNewColumn = false;
      this.resetAddColumnForm();
    }
  }

  resetAddColumnForm() {
    this.title = '';
    this.color = '#758bfd';
  }
}
