import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-option-column',
  imports: [NgIf],
  templateUrl: './option-column.component.html',
  styleUrl: './option-column.component.css',
})
export class OptionColumnComponent {
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
