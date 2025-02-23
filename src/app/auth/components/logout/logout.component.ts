import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { apiUrl } from '../../../../env/auth_api.environment';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  providers: [AuthService],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(private authService: AuthService) {};

  async logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}