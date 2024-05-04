import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, RouterLink],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    if(this.form.valid){
      this.authService.login(this.form.getRawValue()).subscribe({
        next: (data)=> {
          console.log('data', data);
          this.router.navigateByUrl("/home");
          this.form.reset();
        },
        error: (err) => {
          console.log('err', err);
          this.errorMessage = err.message;
        }
      })
    }
  }
}
