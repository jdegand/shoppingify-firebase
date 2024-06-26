import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { RegisterRequest } from '../../interfaces/register-request.interface';
import { Observable, from } from 'rxjs';
import { LoginRequest } from '../../interfaces/login-request.interface';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<User | null | undefined>(undefined);

  register(payload: RegisterRequest): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      payload.email,
      payload.password
    ).then(response => updateProfile(response.user, { displayName: payload.username }));

    return from(promise);
  }

  login(payload: LoginRequest) {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      payload.email,
      payload.password
    );
    return from(promise);
  }

  logout(){
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

}
