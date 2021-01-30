import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  products: Product[];


  constructor(private productService: ProductService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.productService.currentProducts.subscribe(products => (this.products = products), err => err);



    
    this.productService.getProductsById(id).subscribe(res => {
      this.products = res.products.map(product => {
        return {
          id: product._id,
          prod_name: product.cat_name,
          price:product.price,
          model:product.model,
          imageUrl: product.imageUrl,

        };
      });
     // this.productService.displayedCategories(this.categories);
      //this.categories.reverse();
    });


  }

}
