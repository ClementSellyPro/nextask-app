import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgClass, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  currentUrl: string = '';
  isUserMenuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
      });

    this.currentUrl = this.router.url;
  }

  onClickUser() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onLogOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
