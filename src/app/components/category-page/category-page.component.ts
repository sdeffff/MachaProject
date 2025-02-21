import { Component, Renderer2 } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//To handle data from the server:
import { NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
//ActivatedRoute to get info about current route:
import { ActivatedRoute } from '@angular/router';

//Header
import { ProductHeaderComponent } from '../product-header/product-header.component';

//Service:
import { CategoryService } from '../../services/category-services/category.service';

import { LogoutComponent } from '../../auth/components/logout/logout.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [HttpClientModule, NgFor, ProductHeaderComponent, FormsModule, NgStyle, LogoutComponent],
  providers: [CategoryService],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent {
  protected products: any[] = []; //storing products from the server
  protected category!: string; //category selected by the admin

  private currentImgMap: Map<number, string> = new Map();

  constructor (private categoryService: CategoryService, private route: ActivatedRoute,
    private renderer: Renderer2) {};
  
  ngOnInit() {
    //Function below is used to get the category name from the url or jeans(default value)
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || "";
      this.getProducts(); //calling to get the products for the current page from the server
    });

    //Styles to hide scrollbar
    this.renderer.setStyle(document.body, 'overflow', 'auto');
    this.renderer.setStyle(document.body, 'scrollbar-width', 'none'); // Firefox
    this.renderer.setStyle(document.body, '-ms-overflow-style', 'none'); // IE & Edge

    // For WebKit browsers (Chrome, Safari)
    const style = document.createElement('style');
    style.innerHTML = `
      ::-webkit-scrollbar {
        display: none;
      }
    `;
    
    document.head.appendChild(style);
  }

  //Functions to handle image changing on hover
  onMouseOver(index: number): void {
    const prod = this.products[index]; 
    this.currentImgMap.set(index, prod.pictures[1]);
  }

  onMouseLeave(index: number): void {
    const prod = this.products[index]; 
    this.currentImgMap.set(index, prod.pictures[0]);
  }

  getCurrentImg(index: number): string | undefined {
    return this.currentImgMap.get(index);
  }

  getProducts(): void {
    this.categoryService.getProducts(this.category).subscribe({ //calling the function from the service
      next: (data) => { 
        this.products = data; //what we are getting from the server adding to the products array
     
        this.products.forEach((el, index) => {
          this.currentImgMap.set(index, el.pictures[0]); //setting default img for every index
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
