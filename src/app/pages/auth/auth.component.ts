import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgClass, NgIf } from '@angular/common';
import { finalize } from 'rxjs';

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
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isLoginMode = params['mode'] === 'login';
    });
    if (this.authService.getToken()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  private validateInputs(): boolean {
    if (!this.name?.trim() || !this.password?.trim()) {
      this.inputError = true;
      return false;
    }
    this.inputError = false;
    return true;
  }

  onSubmitLogin() {
    if (!this.validateInputs()) {
      return;
    }

    this.isLoading = true;

    this.authService
      .login(this.name, this.password)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          if (response.token) {
            this.inputError = false;
            this.resetForm();
            this.router.navigateByUrl('/dashboard');
          } else {
            this.inputError = true;
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
    if (!this.validateInputs()) {
      return;
    }

    this.isLoading = true;

    this.authService
      .register(this.name, this.password)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe();
    this.resetForm();
    this.router.navigateByUrl('/auth/login');
  }

  resetForm() {
    this.name = '';
    this.password = '';
  }
}
