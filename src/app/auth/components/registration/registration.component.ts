import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';

//To handle forms in html
import { FormsModule } from '@angular/forms';

import { FooterComponent } from '../../../components/footer/footer.component';
import { AuthLoaderComponent } from '../auth-loader/auth-loader.component';

//Interface for data
import { registerModel } from '../../models/register.model';

//Service
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, FooterComponent, AuthLoaderComponent],
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

  ngOnInit() {
    this.authService.checkUser().subscribe({
      next: (res) => {
        if(res.isAuthenticated === true) this.router.navigate(["/"]);
      },

      error: (err) => {
        console.log(err);
      }
    })
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
    }).pipe(
      concatMap(() => this.authService.login(this.user.email, this.user.password)),
      concatMap(() => this.authService.checkUser()))
      .subscribe({
      next: (res) => {
        //make auto login after a sign up
        //check if the user is logged in, in ngOnInit()
        //if the user is admin - redirect him to panel

        console.log(res);

        if(res.user.status === "admin") {
          this.router.navigate(["/admin"]);
        } else this.router.navigate(["/"]);
      },
      error: (err) => {
          console.error("Request failed:", err); 
          if (err.status === 409) alert("This email is already in use");
      }
    });
  }
}