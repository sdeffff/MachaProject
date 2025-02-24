import { Component } from '@angular/core';
import { FormsModule, NgForm, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { };

  protected user: loginModel = {
    email: "",
    password: "",
  }

  ngOnInit(): void {
    this.authService.checkUser().subscribe({
      next: (res) => {
        if(res.isAuthenticated === true) this.router.navigate(["/"]);
      },

      error: (err) => {
        console.log(err);
      }
    })
  }

  async login() {
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (res) => {
        if(res.status === "admin") this.router.navigate(["/admin"])
        else this.router.navigate(["/"]);
      },
      error: (err) => {
        this.user.email = "";
        this.user.password = "";

        console.log(err);
      }
    })
  }

  async check() {
    this.authService.checkUser().subscribe({
      next: (res) => {
        console.log("ok", res);
      },
      error: (err) => {
        console.log("no", err);
      }
    })
  }
}
