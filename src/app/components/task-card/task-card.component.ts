import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardType } from '../../models/Card.model';
import { DatePipe, NgIf } from '@angular/common';
import { ModalAddCardComponent } from '../modal-add-card/modal-add-card.component';

@Component({
  selector: 'app-task-card',
  imports: [FormsModule, DatePipe, ModalAddCardComponent, NgIf],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @ViewChild('checkSection', { static: false })
  checkSection!: ElementRef<HTMLElement>;
  isCompleted: boolean = false;
  isUpdating: boolean = false;
  @Input() cardData!: CardType;
  @Input() columnID!: string;

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey() {
    if (this.isUpdating) {
      this.isUpdating = false;
    }
  }

  onMouseHover() {
    if (this.checkSection) {
      this.displayCheckbox();
    }
  }

  onMouseLeave() {
    if (this.checkSection && !this.isCompleted) {
      this.hideCheckbox();
    }
  }

  onCompleted() {
    if (!this.isCompleted) {
      this.hideCheckbox();
      this.isCompleted = false;
    } else {
      this.displayCheckbox();
      this.isCompleted = true;
    }
  }

  hideCheckbox() {
    this.checkSection.nativeElement.style.display = 'none';
    this.checkSection.nativeElement.style.width = '0%';
  }

  displayCheckbox() {
    this.checkSection.nativeElement.style.display = 'block';
    this.checkSection.nativeElement.style.width = '15%';
  }

  onOpenUpdateModal(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('checkmark')) {
      this.isUpdating = true;
    }
  }

  onCloseUpdateModal() {
    this.isUpdating = false;
  }
}
