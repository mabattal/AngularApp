import { Component } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void{
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.email == environment.adminEmail;
    })
  }

  logout(){
    this.authService.logout();
  }
}
