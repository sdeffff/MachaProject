import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private router: Router) { };

  redirect() {
    this.router.navigate(["/"]);
  }
}