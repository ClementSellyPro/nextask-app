import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, UpdateProjectNameRequest } from '../models/Project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:9000/api/projects';

  constructor(private http: HttpClient) {}

  getCurrentProject(): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}`);
  }

  updateProjectName(newName: string): Observable<Project> {
    const request: UpdateProjectNameRequest = { name: newName };
    return this.http.put<Project>(`${this.apiUrl}/name`, request);
  }
}
