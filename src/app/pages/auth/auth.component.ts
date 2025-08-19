import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, RouterLink, NgClass, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  name!: string;
  password!: string;
  inputError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isLoginMode = params['mode'] === 'login';
    });
  }

  onSubmitLogin() {
    this.authService.login(this.name, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.router.navigateByUrl('dashboard');
        } else {
          alert('Connexion echouee');
        }
        this.inputError = false;
        this.resetForm();
      },
      error: (err) => {
        this.inputError = true;
        console.error('Login error:', err);
      },
    });
  }

  onSubmitSignup() {
    if (this.name && this.password) {
      this.authService.register(this.name, this.password).subscribe();
      this.resetForm();
      this.router.navigateByUrl('/auth/login');
    }
  }

  resetForm() {
    this.name = '';
    this.password = '';
  }
}
