import { TaskColumType } from './TaskColumn.model';

export interface Project {
  id: string;
  name: string;
  columns: TaskColumType[];
}

export interface UpdateProjectNameRequest {
  name: string;
}
