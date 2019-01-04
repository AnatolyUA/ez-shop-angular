import { Observable } from 'rxjs'

import { Category, Product } from '../common.interfaces'
import { ProductsRequest, ProductsResponse } from '../productsRequest'

export interface IProductsShop {
  getProducts(productsRequest: ProductsRequest): Observable<ProductsResponse>
  getProduct(id: number): Observable<Product>
}

export interface ICategoriesShop {
  getCategories(): Observable<Category[]>
}
