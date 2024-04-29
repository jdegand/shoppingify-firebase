import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: "login",
    title: "Please sign in",
    component: LoginComponent,
  },
  {
    path: "register",
    title: "Please sign up",
    loadComponent: () =>
      import("./pages/register/register.component").then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: "home",
    title: "Shoppingify",
    loadComponent: () =>
      import("./pages/home/home.component").then(
        (m) => m.HomeComponent,
      ),
  },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "**",
    title: "404 Not Found",
    loadComponent: () =>
      import("./pages/not-found/not-found.component").then(
        (m) => m.NotFoundComponent,
      ),
  },
];
