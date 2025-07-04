import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ModalFilterComponent } from '../modal-filter/modal-filter.component';

@Component({
  selector: 'app-dashboard-header',
  imports: [ModalFilterComponent, NgIf],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css',
})
export class DashboardHeaderComponent {
  isModalOpen: boolean = false;

  onFilterClick() {
    this.isModalOpen = !this.isModalOpen;
  }
}
