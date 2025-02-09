import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

import { PanelComponent } from './admin/components/panel/panel.component';


export const routes: Routes = [
    { path: "", component: HomeComponent},

    { path: "products/:category", component: CategoryPageComponent},
    { path: "products/:category/:id", component: ProductPageComponent},

    { path: "admin", component: PanelComponent}
];