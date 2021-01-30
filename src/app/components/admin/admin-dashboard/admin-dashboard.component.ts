import { Component, Input, OnInit } from '@angular/core';
import { Product } from "src/app/models/Product";
import { Category } from "src/app/models/Category";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  @Input() 
  products: Product[];
  currentProduct: Product;
  searchText: string;


  constructor( private productService: ProductService) {}

  ngOnInit() {
    this.onShowAllProducts()
    this.productService.currentProducts.subscribe(products => (this.products = products), err => err);
  }



  onShowAllProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.productService.displayedProducts(
        res.products.map(product => {
          return {
            id: product._id,
            prod_name: product.prod_name,
            price: product.price,
            quantity:product.quantity,
            productCode:product.productCode

          };
        })
      );
    });
  }
 
  onSearch(productName) {
    this.productService.getProductsByName(productName).subscribe(
      res => {
        this.productService.displayedProducts(
          res.products.map(product => {
            return {
              id: product._id,
              prod_name: product.prod_name,
              price: product.price,
              model:product.model,

              imageUrl: product.imageUrl,
              category: product.category.cat_name
            };
          })
        );
      },
      
    );
  }


  onDeleteProduct(product,index) {
      if(window.confirm('Are you sure?')) {
        this.productService.deleteProduct(product._id).subscribe((data) => {
          this.products.splice(index, 1);

        }
      )    
    }
    
  }


}
