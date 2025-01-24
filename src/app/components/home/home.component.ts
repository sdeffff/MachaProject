import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

import { getWindow } from 'ssr-window';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public loaderStyles = "transform: scaleY(0)"; // Initialize height to full screen
  public loaderLogoStyles = "opacity: 0";

  ngOnInit() {
    const window = getWindow(); //to get window instance when ur on ssr

    window.addEventListener("load", () => {
      this.loaderLogoStyles = "opacity: 0";
      this.loaderStyles = "transform: scaleY(0)";
    })
  }
}
