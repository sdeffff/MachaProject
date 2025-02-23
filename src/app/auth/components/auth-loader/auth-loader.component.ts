import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-loader',
  standalone: true,
  imports: [],
  templateUrl: './auth-loader.component.html',
  styleUrl: './auth-loader.component.scss'
})
export class AuthLoaderComponent {
  protected loaderStyles: string = "opacity: 1; visibility: visible;";

  constructor() { };

  ngOnInit() {
    this.loaderStyles = "opacity: 0; visibility: hidden;";
  }
}