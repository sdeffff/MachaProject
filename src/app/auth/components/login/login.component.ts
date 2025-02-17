import { Component } from '@angular/core';
import { FormsModule, NgForm, FormBuilder } from '@angular/forms';

import { FooterComponent } from '../../../components/footer/footer.component';

import { loginModel } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: '../registration/registration.component.scss'
})
export class LoginComponent {

  constructor() { };

  protected user: loginModel = {
    email: "",
    password: "",
  }
}
