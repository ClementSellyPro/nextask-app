import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { ProjectBoardComponent } from '../../components/project-board/project-board.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardHeaderComponent, ProjectBoardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
