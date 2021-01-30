import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators,NgForm } from "@angular/forms";
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  submitted = false;
  products: Product[];
  editForm: FormGroup;

  constructor(private productService: ProductService,private route: ActivatedRoute,public fb: FormBuilder,private router:Router) {}

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
          quantity:product.quantity

        };
      });
    });

    this.editForm = this.fb.group({
      quantity: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
  
    })

  }

  get f() { 
    return this.editForm.controls; 
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.route.snapshot.paramMap.get('id');  
          this.productService.UpdateProduct(id, this.editForm.value).subscribe(
            res => {
              this.router.navigateByUrl('/admin-dashborard');
              alert('Content updated successfully!')
            },
            err => {
              alert(err)

            }
          );
        


      }
    }
  }





}