import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/Product";
import { Category } from "src/app/models/Category";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],

})
export class CreateProductComponent implements OnInit {

  isEmpty: boolean = false;
  isOK: boolean = false;
  warning: string = "";
  categories: Category[];
  currentProduct: Product = null;
  isFileSelected: boolean = false;
  selectedFile: any = null;

  constructor(private productService: ProductService) {}


  ngOnInit() {
 
    this.updateCategories();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile)
      if (
        this.selectedFile.type !== "image/jpeg" &&
        this.selectedFile.type !== "image/jpg" &&
        this.selectedFile.type !== "image/png"
      ) {
        this.isFileSelected = true;
        this.isEmpty = true;
        this.isOK = false;
        this.warning = "File type is invalid";
      } else this.isEmpty = false;
  }

  onAddProduct() {
    this.isOK = false;
    this.onClearForm();
  }

  onSaveNewProduct(form) {
    if (this.validateForm(form)) {
      this.isEmpty = false;
      let fd = new FormData();
      fd.append("prod_name", form.controls.prod_name.value);
      fd.append("price", form.controls.price.value);
      fd.append("category", form.controls.category.value);
      fd.append("productCode", form.controls.productCode.value);
      fd.append("model", form.controls.model.value);
      fd.append("brand", form.controls.brand.value);
      fd.append("quantity", form.controls.quantity.value);
      fd.append("imageUrl", this.selectedFile, this.selectedFile.name);

      this.productService.createProduct(fd).subscribe(
        res => {
          this.onClearForm();
          this.isOK = true;
          this.isEmpty = true;
          this.warning = "Product was successfully created";
        },
        err => {
          this.isEmpty = true;
          this.isOK = false;
          this.warning = "Could not create new product";
        }
      );
    } else {
      this.isOK = false;
      this.isEmpty = true;
    }
  }

 

  onClearForm() {
    this.currentProduct = { id: "", prod_name: "", price: null, category: "", imageUrl: "",model:"",quantity:null,productCode:"",brand:"" };
    this.selectedFile = null;
    this.isEmpty = false;
    this.isFileSelected = false;
  }

  validateForm(form) {
    let prod_name = form.controls.prod_name.value,
      price = form.controls.price.value,
      quantity = form.controls.quantity.value,
      model = form.controls.model.value,
      brand = form.controls.brand.value,
      productCode = form.controls.productCode.value,
      category = form.controls.category.value;

   
      if (!this.selectedFile) {
        this.warning = "Please upload an image";
        return false;
      }
      if (
        this.selectedFile.type !== "image/jpeg" &&
        this.selectedFile.type !== "image/jpg" &&
        this.selectedFile.type !== "image/png"
      ) {
        this.warning = "File type is invalid";
        return false;
      }
      if (form.pristine) {
        this.warning = "Please fill all required fields";
        return false;
      }
      if (((prod_name && !prod_name.trim()) 
      || (category && !category.trim())
      || (model && !model.trim())  
      || (brand && !brand.trim()) 
      || (productCode && !productCode.trim()) 
      || price||
     quantity ) 
      && form.pristine) {
        this.warning = "Please fill all required fields";
        return false;
      }
      if (prod_name.length < 2 || form.controls.prod_name.pristine) {
        this.warning = "Product name must be at least 10 characters";
        return false;
      }
      if (model.length < 2 || form.controls.model.pristine) {
        this.warning = "Product model must be at least 2 characters";
        return false;
      } 
      
      if (brand.length < 2 || form.controls.brand.pristine) {
        this.warning = "Product brand must be at least 2 characters";
        return false;
      } 
      
      if (productCode.length < 2 || form.controls.productCode.pristine) {
        this.warning = "Product Code must be at least 10 characters";
        return false;
      }

      if (category.length < 2) {
        this.warning = "Category must be at least 2 characters";
        return false;
      }
      if (category == "Choose Category") {
        this.warning = "Choose a category, if there are none create one";
        return false;
      }
      if (price == 0 || form.controls.price.pristine) {
        this.warning = "Product price must be higher then 0";
        return false;
      }

      if (quantity == 0 || form.controls.quantity.pristine) {
        this.warning = "Product quantity must be higher then 0";
        return false;
      }
    return true;
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
      this.productService.displayedCategories(this.categories);
    //this.categories.reverse();
    });
  }
}
