import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'primeng/colorpicker';
import { TaskColumnsService } from '../../services/task-columns.service';

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
  @Input() columnId!: string;
  @Input() currentTitle!: string;
  @Input() currentColor!: string;
  titleUpdate!: string;
  colorUpdate!: string;

  constructor(private taskColumnsService: TaskColumnsService) {}

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

  onSaveUpdateColumn() {
    this.taskColumnsService.updateColumn(
      this.columnId,
      this.titleUpdate,
      this.colorUpdate
    );
    this.isUpdatingColumn = false;
  }

  onCancelUpdateColumn() {
    this.titleUpdate = this.currentTitle;
    this.colorUpdate = this.currentColor;
    this.isUpdatingColumn = false;
  }
}
