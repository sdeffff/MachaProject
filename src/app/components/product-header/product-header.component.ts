import { Component, ElementRef, QueryList } from '@angular/core';

import { ViewChildren } from '@angular/core';

import { HeaderService } from '../../services/headerService/header.service';

@Component({
  selector: 'product-header',
  standalone: true,
  imports: [],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.scss'
})
export class ProductHeaderComponent {
  @ViewChildren("headerLink") links!: QueryList<ElementRef>;

  constructor(private headerService: HeaderService) {};

  increaseOpacity(): void {
    this.headerService.increaseOpacity(this.links);
  }

  decreaseOpacity(i: number): void {
    this.headerService.decreaseOpacity(i, this.links);
  }
}
