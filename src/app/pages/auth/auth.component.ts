import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  name!: string;
  password!: string;

  constructor(private router: Router){}

  onSubmitAuth() {
    console.log("name: ", this.name, " password: ", this.password);
    this.router.navigateByUrl('dashboard');
  }
}
