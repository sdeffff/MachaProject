import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product-services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [],
  providers: [ProductService],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  private category!: string;
  private id!: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) { };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.category = params.get("category") || "";
      this.id = params.get("id") || "";
    })

    this.getProduct();
  }

  getProduct(): void {
    this.productService.getProduct(this.id, this.category).subscribe({
      next: (res) => {
        console.log(res);
      },

      error: (err) => {
        console.log(err);
      }
    })
  }
}