import { Component, OnInit } from '@angular/core';
import { TaskColumnComponent } from '../task-column/task-column.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { TaskColumnsService } from '../../services/task-columns.service';
import { combineLatest, map, Observable } from 'rxjs';
import {
  TaskColumnResponse,
  TaskColumnWithCards,
} from '../../models/TaskColumn.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HorizontalScroll } from '../../directives/horizontal-scroll.directive';
import { CardResponse } from '../../models/Card.model';

@Component({
  selector: 'app-project-board',
  imports: [
    TaskColumnComponent,
    ColorPickerModule,
    FormsModule,
    AsyncPipe,
    CommonModule,
    HorizontalScroll,
  ],
  templateUrl: './project-board.component.html',
  styleUrl: './project-board.component.css',
})
export class ProjectBoardComponent implements OnInit {
  isAddNewColumn: boolean = false;
  color: string = '#758bfd';
  title!: string;
  taskColumns$!: Observable<TaskColumnResponse[]>;
  taskCards$!: Observable<CardResponse[]>;
  columnsWithCards$!: Observable<TaskColumnWithCards[]>;

  constructor(private taskColumnsService: TaskColumnsService) {}

  ngOnInit(): void {
    this.taskColumns$ = this.taskColumnsService.getColumnData();
    this.taskCards$ = this.taskColumnsService.getCards();
    this.columnsWithCards$ = combineLatest([
      this.taskColumns$,
      this.taskCards$,
    ]).pipe(
      map(([columns, cards]) => {
        const ids = columns.map((col) => col.id);
        return columns.map((col) => ({
          ...col,
          cards: cards.filter((c) => c.columnId === col.id),
          connectedLists: ids.filter((id) => id !== col.id),
        }));
      })
    );
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
