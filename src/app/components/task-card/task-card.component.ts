import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardType } from '../../models/Card.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [FormsModule, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @ViewChild('checkSection', { static: false })
  checkSection!: ElementRef<HTMLElement>;
  isCompleted: boolean = false;
  @Input() cardData!: CardType;

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
}
