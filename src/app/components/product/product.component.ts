import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//To handle data from the server:
import { NgIf, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
//ActivatedRoute to get info about current route:
import { ActivatedRoute } from '@angular/router';

//Header
import { ProductHeaderComponent } from '../product-header/product-header.component';

//Service:
import { ProductService } from '../../services/productServices/product.service';

@Component({
  selector: 'app-jeans',
  standalone: true,
  imports: [HttpClientModule, NgIf, NgFor, ProductHeaderComponent, FormsModule, NgStyle],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class JeansComponent {
  protected products: any[] = []; //storing products from the server
  private category!: string; //category selected by the admin

  constructor (private productService: ProductService, private route: ActivatedRoute) {};
  
  ngOnInit() {
    //Function below is used to get the category name from the url or jeans(default value)
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || "jeans";
      this.getProducts(); //calling to get the products for the current page from the server
    });

    console.log(this.products);
  }

  getProducts(): void {
    this.productService.getProducts(this.category).subscribe({ //calling the function from the service
      next: (data) => { 
        this.products = data; //what we are getting from the server adding to the products array
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
