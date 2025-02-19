import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { FooterComponent } from '../../../components/footer/footer.component';

import { registerModel } from '../../models/register.model';
import { postRegisterData } from '../../models/postRegisterData.model';

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
  constructor(private authService: AuthService) { };

  protected user: registerModel = {
    email: "",
    password: "",
    confirmPwd: "",
    country: "",
  }

  async signUp() {
    this.authService.addNewUser({ email: this.user.email, password: this.user.password, country: this.user.country }).subscribe({
      next: (res) => {},

      error: (err) => {
        if(err.error.status === 409) alert("This email is already in use =)");

        console.log(err);
      }
    });
  }
}