import { Component } from '@angular/core';

import { FormsModule, NgForm, FormBuilder } from '@angular/forms';

import { FooterComponent } from '../../../components/footer/footer.component';

import { registerModel } from '../../models/register.model';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  providers: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  constructor() { };

  protected user: registerModel = {
    email: "",
    password: "",
    confirmPwd: "",
    country: "",
  }

  onClikc() {
    console.log('aasd')
  }
}