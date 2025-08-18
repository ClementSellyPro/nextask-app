import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, UpdateProjectNameRequest } from '../models/Project.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentProject(): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects`);
  }

  updateProjectName(newName: string): Observable<Project> {
    const request: UpdateProjectNameRequest = { name: newName };
    return this.http.put<Project>(`${this.apiUrl}/projects/name`, request);
  }
}
