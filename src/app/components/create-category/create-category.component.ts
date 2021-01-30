import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/services/product.service";
import { Category } from "src/app/models/Category";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],

})
export class CreateCategoryComponent implements OnInit {
  public successMsg: boolean;
  public errorMsg: boolean;
  warning: string = "";
  categories: Category[];


  constructor(private productService: ProductService) {}


  ngOnInit() {
    this.productService.getAllCategories().subscribe(res => {
      this.categories = res.categories.map(category => {
        return {
          id: category._id,
          cat_name: category.cat_name,
          products: category.products
        };
      });
     // this.productService.displayedCategories(this.categories);
      //this.categories.reverse();
    });
  }


  onAddCategory(form) {
    if (form.valid) {
      this.productService.createCategory({ cat_name: form.controls.category_add.value }).subscribe(
        res => {
          this.successMsg=true;
          this.errorMsg=false;
          this.warning = "Successfully added";
          this.updateCategories();
          form.reset();
        },
        err => {

          this.successMsg=false;
          this.errorMsg=true;
           this.warning = "Could not create new category ! Enter other name";
        }
      );
    }
  }

  remove(category, index) {
    if(window.confirm('Are you sure?')) {
        this.productService.deleteCategory(category.id).subscribe((data) => {
          this.categories.splice(index, 1);
        }
      )    
    }
  
  }

  

  updateCategories() {
    this.productService.getAllCategories().subscribe(res => {
      this.categories = res.categories.map(category => {
        return {
          id: category._id,
          cat_name: category.cat_name,
          products: category.products
        };
      });
     // this.productService.displayedCategories(this.categories);
    // this.categories.reverse();
    });
  }
}
