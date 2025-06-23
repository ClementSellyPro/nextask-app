import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth/:mode',
    component: AuthComponent
  },
  {
    path: 'auth',
    redirectTo: 'auth/login', pathMatch:'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
