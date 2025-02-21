import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, catchError, throwError } from 'rxjs';

import { FormsModule } from '@angular/forms';

import { FooterComponent } from '../../../components/footer/footer.component';

import { registerModel } from '../../models/register.model';
import { postRegisterData } from '../../models/postRegisterData.model';

import { LoginComponent } from '../login/login.component';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  providers: [AuthService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  constructor(private authService: AuthService, private router: Router) { };

  protected user: registerModel = {
    email: "",
    password: "",
    confirmPwd: "",
    country: "",
  }

  async signUp() {
    if(this.user.password !== this.user.confirmPwd) {
      alert("Passwords are not matching!");
      return;
    }
  
    this.authService.addNewUser({ 
      email: this.user.email, 
      password: this.user.password, 
      country: this.user.country 
    }).subscribe({
      next: (res) => {
          console.log("Request successful:", res);
      },
      error: (err) => {
          console.error("Request failed:", err); 
          if (err.status === 409) alert("This email is already in use");
      }
  });
  }
}