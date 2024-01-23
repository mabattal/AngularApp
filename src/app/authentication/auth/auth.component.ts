import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from '../auth-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode: boolean = true;
  loading: boolean = false;
  error: string = "";

  constructor(private authService: AuthService, private router: Router) {  }

  toggleMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  handleAuth(form: NgForm){
    console.log(form.value);

    this.loading = true;

    const email = form.value.email;
    const password = form.value.password;
    let authResponse: Observable<AuthResponse>;

    if(this.isLoginMode){
      authResponse = this.authService.login(email, password);
    }
    else{
      authResponse = this.authService.register(email, password);
    }

    authResponse.subscribe({
      next: () => {
        this.loading = false;
        this.error = "";
        this.router.navigate(['/']);
      },

      error:(err) =>{
        this.loading = false;
        this.error = err;
      }
    });
  }
}
