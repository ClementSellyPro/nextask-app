import { Component, Input, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ModalAddCardComponent } from '../modal-add-card/modal-add-card.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { TaskColumnResponse } from '../../models/TaskColumn.model';
import { OptionColumnComponent } from '../option-column/option-column.component';
import { TaskColumnsService } from '../../services/task-columns.service';
import { CardResponse, CardType } from '../../models/Card.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task-column',
  imports: [
    TaskCardComponent,
    ModalAddCardComponent,
    NgIf,
    OptionColumnComponent,
    AsyncPipe,
  ],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.css',
})
export class TaskColumnComponent implements OnInit {
  apiUrl: string = 'http://localhost:9000/api';

  isModalTaskOpen: boolean = false;
  @Input() columnData!: TaskColumnResponse;
  taskCardData$!: Observable<CardResponse[]>;

  constructor(
    private taskColumnService: TaskColumnsService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // const token = this.authService.getToken();

    // const headers = new HttpHeaders()
    //   .set('Authorization', `Bearer ${token}`)
    //   .set('Content-Type', 'application/json');

    // this.http
    //   .get<any>(`${this.apiUrl}/columns`, {
    //     headers,
    //   })
    //   .subscribe({
    //     next: (data) => {
    //       this.taskCardData$ = data;
    //     },
    //     error: (error) => {
    //       console.error('Erreur: ', error);
    //       console.error('Status: ', error.status);
    //       console.error('Message: ', error.message);
    //     },
    //   });

    this.taskCardData$ = this.taskColumnService.getCards();
  }

  onOpenModal() {
    this.isModalTaskOpen = true;
  }

  handleCloseModal() {
    this.isModalTaskOpen = false;
  }

  handleDeleteColumn(id: string) {
    this.taskColumnService.deleteColumn(id).subscribe();
    this.isModalTaskOpen = false;
  }
}
