import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'primeng/colorpicker';

@Component({
  selector: 'app-option-column',
  imports: [NgIf, ClickOutsideDirective, FormsModule, ColorPicker],
  templateUrl: './option-column.component.html',
  styleUrl: './option-column.component.css',
})
export class OptionColumnComponent implements OnInit {
  @Output() deleteColumnEvent = new EventEmitter<void>();
  isMenuOpen: boolean = false;
  isUpdatingColumn: boolean = false;
  @Input() currentTitle!: string;
  @Input() currentColor!: string;
  titleUpdate!: string;
  colorUpdate!: string;

  ngOnInit(): void {
    this.titleUpdate = this.currentTitle;
    this.colorUpdate = this.currentColor;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onDeleteColumn() {
    this.deleteColumnEvent.emit();
  }

  onOpenUpdateForm() {
    this.isUpdatingColumn = true;
    this.isMenuOpen = false;
  }

  onSaveUpdateColumn() {}

  onCancelUpdateColumn() {
    this.isUpdatingColumn = false;
    this.isMenuOpen = true;
  }
}
