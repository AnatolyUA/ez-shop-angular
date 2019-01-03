import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { CacheService } from 'src/app/common/cache.service'
import { Product } from 'src/app/common/common.interfaces'
import {
  OrderBy,
  ProductsRequest,
  ProductsResponse,
} from 'src/app/common/productsRequest'

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[]
  private cacheId = 'products'

  constructor(private cacheService: CacheService) {
    this.products = this.cacheService.getItem(this.cacheId)
    if (!this.products) {
      this.seed()
    }
  }

  public getProduct(id: number): Observable<Product> {
    return of(this.products[id])
  }

  public getProducts(
    productsRequest = new ProductsRequest()
  ): Observable<ProductsResponse> {
    const result = new ProductsResponse(productsRequest)

    let products = this.products.filter(p => p != null)

    if (productsRequest.categories.length > 0) {
      products = products.filter(p =>
        p.categories.some(c => productsRequest.categories.indexOf(c.id) > -1)
      )
    }

    if (productsRequest.keyword) {
      products = products.filter(p =>
        p.name.toLocaleLowerCase().includes(productsRequest.keyword.toLocaleLowerCase())
      )
    }

    result.total = products.length
    if (result.total === 0) {
      return of(result)
    }

    products = products.sort(this.sortingFunction(productsRequest.orderBy))

    result.totalPages = Math.ceil(result.total / productsRequest.pageSize)
    if (productsRequest.page <= result.totalPages) {
      products = products.splice(
        (productsRequest.page - 1) * productsRequest.pageSize,
        productsRequest.pageSize
      )
      result.page = productsRequest.page
      result.products = products
      return of(result)
    }

    result.page = 1
    result.products = products.splice(0, productsRequest.pageSize)
    return of(result)
  }

  private sortingFunction(orderBy: OrderBy) {
    if (orderBy.propertyName === 'price') {
      return (a: Product, b: Product) =>
        orderBy.ordering === 'desc' ? b.price - a.price : a.price - b.price
    }

    return (a: Product, b: Product) =>
      orderBy.ordering === 'desc'
        ? b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleLowerCase())
        : a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
  }

  public addOrUpdateProduct(product: Product): Observable<Product> {
    const id = product.id === 0 ? this.products.length : product.id
    this.products[id] = product
    this.save()
    return of(this.products[id])
  }

  public removeProduct(id: number) {
    this.products[id] = null
    this.save()
  }

  private save(): void {
    this.cacheService.setItem(this.cacheId, this.products)
  }

  private seed() {
    this.products = [
      null,
      {
        id: 1,
        name: 'Product 1',
        description: 'some description',
        price: 10.0,
        categories: [
          { id: 1, name: 'Food', description: 'food' },
          { id: 2, name: 'Beverages', description: 'beverages' },
        ],
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'some 2 description',
        price: 11.0,
        categories: [
          { id: 2, name: 'Beverages', description: 'beverages' },
          { id: 3, name: 'Electronics', description: 'electronics' },
        ],
      },
    ]
  }
}
