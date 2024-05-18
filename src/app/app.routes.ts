import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

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
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: "new",
        title: 'New Item',
        loadComponent: () => import('./pages/add-item-form/add-item-form.component').then((m) => m.AddItemFormComponent)
      },
      {
        path: "cart",
        title: "Cart",
        loadComponent: () => import('./pages/cart/cart.component').then((m) => m.CartComponent)
      },
      {
        path: "history",
        title: "Past shopping lists",
        loadComponent: () =>
          import("./pages/history/history.component").then(
            (m) => m.HistoryComponent,
          ),
      },
      {
        path: "stats",
        title: "Stats",
        loadComponent: () =>
          import("./pages/stats/stats.component").then(
            (m) => m.StatsComponent,
          ),
      },
      {
        path: "detail/:id",
        title: "Details",
        loadComponent: () =>
          import("./pages/detail/detail.component").then(
            (m) => m.DetailComponent,
          ),
      },
    ]
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
