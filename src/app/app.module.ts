import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ShopComponent } from './components/shopping/shop/shop.component';
import { ProductListComponent } from './components/shopping/product-list/product-list.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ProductDetailsComponent } from './components/shopping/product-details/product-details.component';
import { UpdateProductComponent } from './components/shopping/update-product/update-product.component';
import { FilterPipe } from "./pipes/filter.pipe";

import { ProductService } from './services/product.service';
import { FilterProductByProductCode } from './pipes/filter-product-by-product-code';
@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    CreateCategoryComponent,
    FooterComponent,
    NavComponent,
    ShopComponent,
    ProductListComponent,
    HomeComponent,
    AdminDashboardComponent,
    ProductDetailsComponent,
    FilterPipe,
    UpdateProductComponent,
    FilterProductByProductCode
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule
  ],
  providers: [ProductService,],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
