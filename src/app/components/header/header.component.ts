import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { HeaderService } from '../../services/headerService/header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChildren("headerLink") links!: QueryList<ElementRef>;
  
  constructor(private headerService: HeaderService) {};

  decreaseOpacity(i: number): void {
    this.headerService.decreaseOpacity(i, this.links);
  }

  increaseOpacity(): void {
    this.headerService.increaseOpacity(this.links);
  }
} 
