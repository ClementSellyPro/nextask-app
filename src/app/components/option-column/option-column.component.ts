import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-option-column',
  imports: [NgIf, ClickOutsideDirective],
  templateUrl: './option-column.component.html',
  styleUrl: './option-column.component.css',
})
export class OptionColumnComponent {
  @Output() deleteColumnEvent = new EventEmitter<void>();
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onDeleteColumn() {
    this.deleteColumnEvent.emit();
  }
}
