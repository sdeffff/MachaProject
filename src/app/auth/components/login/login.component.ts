import { Component } from '@angular/core';
import { FormsModule, NgForm, FormBuilder } from '@angular/forms';

import { FooterComponent } from '../../../components/footer/footer.component';

import { AuthService } from '../../services/auth.service';

import { loginModel } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: '../registration/registration.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService) { };

  protected user: loginModel = {
    email: "",
    password: "",
  }

  async login() {
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
