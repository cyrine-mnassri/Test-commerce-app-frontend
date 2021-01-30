import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
// Services
import { ProductService } from "src/app/services/product.service";
// Models
import { Product } from "src/app/models/Product";
import { Category } from "src/app/models/Category";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() 
  filteredStatus: string = "";
  products: Product[];
  categories: Category[];
  currentProduct: Product;


  constructor(private productService: ProductService) {}


  ngOnInit() {
    this.productService.currentProducts.subscribe(products => (this.products = products), err => err);
    this.productService.getAllCategories().subscribe(
      res =>
        (this.categories = res.categories.map(category => {
          return {
            id: category._id,
            cat_name: category.cat_name,
            products: category.products
          };
        })),
      err => {
        err;
      }
    );


    this.productService.getAllProducts().subscribe(res => {
      this.productService.displayedProducts(
        res.products.map(product => {
          return {
            id: product._id,
            prod_name: product.prod_name,
            price: product.price,
            model:product.model,
            imageUrl: product.imageUrl,
          };
        })
      );
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.productService.getAllProducts().subscribe(
      res =>
        (this.products = res.products.map(product => {
          return {
            id: product._id,
            prod_name: product.prod_name,
            price: product.price,
            model:product.model,

            imageUrl: product.imageUrl,
            category: product.category.cat_name
          };
        })),
      err => {
        err
      }
    );


    this.productService.getAllCategories().subscribe(
      res =>
        (this.categories = res.categories.map(category => {
          return {
            id: category._id,
            cat_name: category.cat_name,
            products: category.products
          };
        })),
      err => {
       err
      }
    );
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



  onCategorySelected(categoryName) {
    this.productService.getProductsByCategory(categoryName).subscribe(
      res => {
        this.productService.displayedProducts(
          res.products.map(product => {
            return {
              id: product._id,
              prod_name: product.prod_name,
              price: product.price,
              model:product.model,

              imageUrl: product.imageUrl,
              category: categoryName
            };
          })
        );
      },
    );
  }





  onShowAllProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.productService.displayedProducts(
        res.products.map(product => {
          return {
            id: product._id,
            prod_name: product.prod_name,
            price: product.price,
            model:product.model,
            imageUrl: product.imageUrl,
          };
        })
      );
    });
  }



 

}


