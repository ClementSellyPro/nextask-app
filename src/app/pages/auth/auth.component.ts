import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  name!: string;
  password!: string;

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
    this.resetForm();
    this.router.navigateByUrl('dashboard');
  }

  onSubmitSignup() {
    this.authService.register(this.name, this.password).subscribe();
    this.resetForm();
    this.router.navigateByUrl('/auth/login');
  }

  resetForm() {
    this.name = '';
    this.password = '';
  }
}
