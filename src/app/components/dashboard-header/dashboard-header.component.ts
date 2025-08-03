import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalFilterComponent } from '../modal-filter/modal-filter.component';
import { ProjectService } from '../../services/project.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../../models/Project.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-header',
  imports: [ModalFilterComponent, NgIf, AsyncPipe, FormsModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css',
})
export class DashboardHeaderComponent implements OnInit {
  defaultProject: Project = {
    id: '',
    name: '',
    columns: [],
  };

  isModalOpen: boolean = false;
  isUpdatingTitle: boolean = false;
  project: BehaviorSubject<Project> = new BehaviorSubject(this.defaultProject);
  project$: Observable<Project> = this.project.asObservable();
  titleUpdate!: string;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject() {
    this.projectService.getCurrentProject().subscribe((data) => {
      this.project.next(data);
    });
  }

  onFilterClick() {
    this.isModalOpen = !this.isModalOpen;
  }

  onClickTitle() {
    this.isUpdatingTitle = true;
  }

  cancelTitleInput() {
    this.isUpdatingTitle = false;
  }

  saveTitleInput() {
    if (this.titleUpdate) {
      this.projectService.updateProjectName(this.titleUpdate);
      this.isUpdatingTitle = false;
    }
  }
}
