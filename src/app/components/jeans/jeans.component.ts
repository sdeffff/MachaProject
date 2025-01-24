import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor, } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductHeaderComponent } from '../product-header/product-header.component';

//Jeans Service:
import { JeansService } from '../../services/productServices/jeans.service';

//Product Model:
import { productModel } from '../../models/product.model';

@Component({
  selector: 'app-jeans',
  standalone: true,
  imports: [HttpClientModule, NgIf, NgFor, ProductHeaderComponent, FormsModule],
  providers: [JeansService],
  templateUrl: './jeans.component.html',
  styleUrl: './jeans.component.scss'
})
export class JeansComponent {
  protected jeans: any[] = [];
  
  @ViewChild("inputImg") inputImg!: ElementRef;
  @ViewChild("sizes") newSizes!: ElementRef;

  constructor (private jeansService: JeansService) {};
  
  ngOnInit() {
    this.getJeans();

    console.log(this.jeans);
  }

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

    if(!res) return;

    if(res.type !== "image/png" && res.type !== "image/jpeg") {
      alert("Please, choose image format");
      inputImg.nativeElement.value = "";
      return;
    }

    return await (this.imageBase64(res)) as string;
  }

  protected newJeans:productModel = {
    name: "",
    price: 0,
    quantity: 0,
    sizes: [],
    picture: "",
  }

  async postNewJeans() {
    this.newJeans.sizes = this.newSizes.nativeElement.value.split(" ");

    const finalImg = await this.getImgToDB(this.inputImg);

    this.newJeans.picture = finalImg;

    this.jeansService.postJeans(this.newJeans).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getJeans(): void {
    this.jeansService.getJeans().subscribe({
      next: (data) => {
        this.jeans = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
