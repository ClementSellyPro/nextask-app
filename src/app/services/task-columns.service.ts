import { Injectable } from '@angular/core';
import { TaskColumType } from '../models/TaskColumn.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskColumnsService {
  taskColumns: BehaviorSubject<TaskColumType[]> = new BehaviorSubject<
    TaskColumType[]
  >([]);
  taskColumns$: Observable<TaskColumType[]> = this.taskColumns.asObservable();

  constructor() {
    this.taskColumns.next([
      {
        name: 'A Faire',
        color: '#007bff',
        cards: [
          {
            title: 'Créer la maquette',
            description: 'Réaliser la maquette initiale de l’application.',
            limitDate: new Date('2025-07-15'),
            storyPoints: '3',
            tags: [
              { name: 'Design', color: '#ff5733' },
              { name: 'Prioritaire', color: '#c70039' },
            ],
          },
          {
            title: 'Configurer l’authentification',
            description: 'Mettre en place l’authentification via JWT.',
            limitDate: new Date('2025-07-20'),
            storyPoints: '5',
            tags: [
              { name: 'Backend', color: '#900c3f' },
              { name: 'Sécurité', color: '#581845' },
            ],
          },
        ],
      },
      {
        name: 'En cours',
        color: '#28a745',
        cards: [
          {
            title: 'Implémenter le drag & drop',
            description:
              'Permettre le déplacement des cartes entre les colonnes.',
            limitDate: new Date('2025-07-10'),
            storyPoints: '8',
            tags: [
              { name: 'UX', color: '#ffc107' },
              { name: 'Frontend', color: '#17a2b8' },
            ],
          },
        ],
      },
      {
        name: 'Terminées',
        color: '#6c757d',
        cards: [
          {
            title: 'Initialiser le projet Angular',
            description: 'Créer la structure de base du projet.',
            limitDate: new Date('2025-06-01'),
            storyPoints: '2',
            tags: [{ name: 'Setup', color: '#20c997' }],
          },
        ],
      },
    ]);
  }

  getData() {
    return this.taskColumns;
  }
}
