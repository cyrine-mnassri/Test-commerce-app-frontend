import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProductService {

  private url = "http://localhost:4000/shop";

  private products = new BehaviorSubject(null);
  currentProducts = this.products.asObservable();

  private product = new BehaviorSubject(null);
  currentProduct = this.product.asObservable();

  private categories = new BehaviorSubject(null);
  currentCategories = this.categories.asObservable();

  constructor(private http: HttpClient) {}

 
 
 

  displayedCategories(categories) {
    this.categories.next(categories);
  }

  displayedProducts(products) {
    this.products.next(products);
  }

  chosenProduct(product) {
    this.product.next(product);
  }

  getAllProducts() {
    return this.http.get<any>(this.url + "/products");
  }

  getAllCategories() {
    return this.http.get<any>(this.url + "/category");
  }

  getProductsByCategory(categoryName) {
    return this.http.get<any>(this.url + "/category/" + categoryName);
  }
  getProductsById(id) {
    return this.http.get<any>(this.url + "/products/" + id);
  
}
  getProductsByName(productName) {
    return this.http.get<any>(this.url + "/search/" + productName);
  }

  createProduct(newProduct) {
    return this.http.post<any>(this.url, newProduct);
  }


  deleteProduct(productId) {
    return this.http.delete<any>(this.url + "/" + productId);
  }

  deleteCategory(CategoryID) {
    return this.http.delete<any>(this.url + "/delete/" + CategoryID);
  }

  createCategory(category) {
    return this.http.post<any>(this.url + "/category", category);
  }

  UpdateProduct(id, data){
    let url = `http://localhost:4000/shop/update/${id}`;
    return this.http.put<any>(url, data)
  }
}
