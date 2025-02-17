import { Routes } from '@angular/router';

//Shop components:
import { HomeComponent } from './components/home/home.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

//Auth components:
import { RegistrationComponent } from './auth/components/registration/registration.component';
import { LoginComponent } from './auth/components/login/login.component';

import { PanelComponent } from './admin/components/panel/panel.component';


export const routes: Routes = [
    { path: "", component: HomeComponent},

    { path: "products/:category", component: CategoryPageComponent},
    { path: "products/:category/:id", component: ProductPageComponent},

    { path: "auth/registration", component: RegistrationComponent},
    { path: "auth/login", component: LoginComponent},

    { path: "admin", component: PanelComponent}
];