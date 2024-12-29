import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{
  public loaderStyles = "transform: scaleY(1)"; // Initialize height to full screen
  public loaderLogoStyles = "opacity: 1";


  ngAfterViewInit() {
    setTimeout(() => {
      this.loaderLogoStyles = "opacity: 0";
    }, 1500);

    setTimeout(() => {
      this.loaderStyles = "transform: scaleY(0)";
    }, 2500);
  }
}
