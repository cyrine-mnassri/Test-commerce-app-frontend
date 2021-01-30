import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/shopping/product-details/product-details.component';
import { ShopComponent } from './components/shopping/shop/shop.component';
import { UpdateProductComponent } from './components/shopping/update-product/update-product.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'shop', component: ShopComponent,  },
  { path: 'home',component: HomeComponent},
  { path: 'admin-dashborard', component: AdminDashboardComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: 'create-category', component: CreateCategoryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
