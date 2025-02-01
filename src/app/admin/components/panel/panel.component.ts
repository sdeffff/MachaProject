import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor, } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductHeaderComponent } from '../../../components/product-header/product-header.component';

//Models:
import { productModel } from '../../../models/product.model';

import { ProductService } from '../../../services/productServices/product.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [HttpClientModule, NgIf, NgFor, ProductHeaderComponent, FormsModule],
  providers: [ProductService],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})

export class PanelComponent {
  @ViewChild("picture") picture!: ElementRef;
  @ViewChild("hoverPicture") hoverPicture!: ElementRef;
  @ViewChild("sizes") newSizes!: ElementRef;

  protected chosenCategory!: string;

  constructor(private productService: ProductService) {};

  async imageBase64(img: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = () => res(reader.result);
      reader.onerror = (err) => rej(err);
    })
  }

  async getImgToDB(inputImg: ElementRef): Promise<string | undefined> {
    const res = inputImg.nativeElement.files[0];

    if(!res) {
      alert("Happened some error, please, try again");

      inputImg.nativeElement.value = "";
      return;
    }

    if(res.type !== "image/png" && res.type !== "image/jpeg") {
      alert("Please, choose right image format");
      inputImg.nativeElement.value = "";
      return;
    }

    return await (this.imageBase64(res)) as string;
  }

  protected newProduct: productModel = {
    category: this.chosenCategory,
    name: "",
    price: 0,
    quantity: 0,
    sizes: [],
    pictures: [],
  }

  //!!! Add checking if the inputs are not empty !!!
  async postNewProduct() {
    this.newProduct.sizes = this.newSizes.nativeElement.value.split(" ");
    
    this.newProduct.pictures.push(await this.getImgToDB(this.picture));
    this.newProduct.pictures.push(await this.getImgToDB(this.hoverPicture));

    this.productService.postProduct(this.chosenCategory, this.newProduct).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}