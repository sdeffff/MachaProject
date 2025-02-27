import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIf, NgFor, } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { ProductHeaderComponent } from '../../../components/product-header/product-header.component';

//Models:
import { productModel } from '../../../models/product.model';

//Services:
import { CategoryService } from '../../../services/category-services/category.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [NgIf, NgFor, ProductHeaderComponent, FormsModule],
  providers: [CategoryService, AuthService],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})

export class PanelComponent {
  @ViewChild("pictures") pictures!: ElementRef;
  @ViewChild("sizes") newSizes!: ElementRef;

  protected chosenCategory!: string;

  constructor(private categoryService: CategoryService, private authService: AuthService,
              private router: Router) {};

  ngOnInit() {
    this.authService.checkUser().subscribe({
      next: (res) => {
        if(res.user.status !== "admin") this.router.navigate(["/"]);
      },

      error: (err) => {
        this.router.navigate(["/"]);
      }
    })
  }

  async imageBase64(img: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = () => res(reader.result);
      reader.onerror = (err) => rej(err);
    })
  }

  async getImgToDB(inputImg: ElementRef): Promise<string[] | undefined> {
    const arr = inputImg.nativeElement.files,
          res = [];

    for(let i = 0; i < arr.length; i++) {
      let current = arr[i];

      if(!current) {
        alert("Happened some error, please, try again");

        inputImg.nativeElement.value = "";
        return;
      }

      if(current.type !== "image/png" && current.type !== "image/jpeg") {
        alert("Please, choose right image format");
        inputImg.nativeElement.value = "";
        return;
      }  

      res.push(await (this.imageBase64(current)) as string);
    }

    return res;
  }

  protected newProduct: productModel = {
    category: "",
    name: "",
    price: 0,
    quantity: 0,
    sizes: [],
    pictures: [],
  }

  //!!! Add checking if the inputs are not empty !!!
  async postNewProduct() {
    this.newProduct.sizes = this.newSizes.nativeElement.value.split(" ");
    
    this.newProduct.pictures = await this.getImgToDB(this.pictures);

    this.newProduct.category = this.chosenCategory;

    this.categoryService.postProduct(this.newProduct).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}