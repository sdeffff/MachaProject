import { ElementRef, QueryList, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  //In short - this service is just for headers, to handle hover function for links in them

  decreaseOpacity(i: number, links: QueryList<ElementRef>): void {
    links.forEach((el, index) => {
      if(index === i) return;

      el.nativeElement.style.opacity = ".5"
    })
  }

  increaseOpacity(links: QueryList<ElementRef>): void {
    links.forEach((el) => {
      el.nativeElement.style.opacity = "1";
    })
  }
}
