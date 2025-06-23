import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  name!: string;
  password!: string;

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoginMode = params['mode'] === 'login';
    })
  }

  onSubmitLogin() {
    this.router.navigateByUrl('dashboard');
  }

  onSubmitSignup() {
    this.router.navigateByUrl('/auth/login');
  }
}
