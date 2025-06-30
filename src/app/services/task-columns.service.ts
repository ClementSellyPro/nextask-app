import { Injectable } from '@angular/core';
import { TaskColumType } from '../models/TaskColumn.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CardType } from '../models/Card.model';

@Injectable({
  providedIn: 'root',
})
export class TaskColumnsService {
  uuid: string = uuidv4();

  taskColumns: BehaviorSubject<TaskColumType[]> = new BehaviorSubject<
    TaskColumType[]
  >([]);
  taskColumns$: Observable<TaskColumType[]> = this.taskColumns.asObservable();

  constructor() {
    this.taskColumns.next([
      {
        id: 'asdhfjk',
        name: 'A Faire',
        color: '#007bff',
        cards: [
          {
            id: 'asdhfjkqwe',
            title: 'Créer la maquette',
            description: 'Réaliser la maquette initiale de l’application.',
            limitDate: new Date('2025-07-15'),
            storyPoints: '3',
            tags: [
              { id: 'fjmjmjsl', name: 'Design', color: '#ff5733' },
              { id: 'fhyhhjsl', name: 'Prioritaire', color: '#c70039' },
            ],
          },
          {
            id: 'asdhfjkqw',
            title: 'Configurer l’authentification',
            description: 'Mettre en place l’authentification via JWT.',
            limitDate: new Date('2025-07-20'),
            storyPoints: '5',
            tags: [
              { id: 'fjbvbvsl', name: 'Backend', color: '#900c3f' },
              { id: 'fjsxcvxl', name: 'Sécurité', color: '#581845' },
            ],
          },
        ],
      },
      {
        id: 'asdhfjkre',
        name: 'En cours',
        color: '#28a745',
        cards: [
          {
            id: 'asdhfjkawe',
            title: 'Implémenter le drag & drop',
            description:
              'Permettre le déplacement des cartes entre les colonnes.',
            limitDate: new Date('2025-07-10'),
            storyPoints: '8',
            tags: [
              { id: 'fjslef', name: 'UX', color: '#ffc107' },
              { id: 'fjslsd', name: 'Frontend', color: '#17a2b8' },
            ],
          },
        ],
      },
      {
        id: 'asdhfjkfd',
        name: 'Terminées',
        color: '#6c757d',
        cards: [
          {
            id: 'asdhfjkqae',
            title: 'Initialiser le projet Angular',
            description: 'Créer la structure de base du projet.',
            limitDate: new Date('2025-06-01'),
            storyPoints: '2',
            tags: [{ id: 'fjsl', name: 'Setup', color: '#20c997' }],
          },
        ],
      },
    ]);
  }

  getData() {
    return this.taskColumns;
  }

  addNewColumn(name: string, color: string) {
    const newColumn: TaskColumType = {
      id: uuidv4(),
      name: name,
      color: color,
      cards: [],
    };
    const updatedColumnList = [...this.taskColumns.getValue(), newColumn];

    this.taskColumns.next(updatedColumnList);
  }

  addNewCard(card: CardType, columnID: string) {
    const newCard: CardType = {
      ...card,
      id: uuidv4(),
    };

    const currentColumns: TaskColumType[] = this.taskColumns.getValue();
    const updatedColumns: TaskColumType[] = currentColumns.map((column) => {
      if (column.id === columnID) {
        return {
          ...column,
          cards: [...column.cards, newCard],
        };
      }
      return column;
    });

    this.taskColumns.next(updatedColumns);
  }
}
