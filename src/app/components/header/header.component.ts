import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChildren("headerLink") lists!: QueryList<ElementRef>;

  decreaseOpacity(i: number) {
    this.lists.forEach((el, index) => {
      if(index === i) return;

      el.nativeElement.style.opacity = ".65";
    })
  }

  increaseOpacity() {
    this.lists.forEach((el) => {
      el.nativeElement.style.opacity = "1";
    })
  }
} 
