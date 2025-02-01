import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { JeansComponent } from './components/product/product.component';
import { PanelComponent } from './admin/components/panel/panel.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},

    {path: "products/:category", component: JeansComponent},
    {path: "admin", component: PanelComponent}
    
    
];