import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  imports: [
    NgIf
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {
  isModalOpen: boolean = false;

  onFilterClick() {
    this.isModalOpen = !this.isModalOpen;
  }
}
