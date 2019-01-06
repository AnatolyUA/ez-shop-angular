import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

import { CacheService } from '../cache.service'
import { Product } from '../common.interfaces'
import { OrderBy, ProductsRequest, ProductsResponse } from '../productsRequest'
import { IProductsShop } from './interfaces'

@Injectable({
  providedIn: 'root',
})
export class ProductsShopServiceMock implements IProductsShop {
  private products: Product[]
  private cacheId = 'products'

  constructor(private cacheService: CacheService) {
    this.products = this.cacheService.getItem(this.cacheId)
    if (!this.products) {
      this.seed()
      this.save()
    }
  }

  getProducts(productsRequest: ProductsRequest): Observable<ProductsResponse> {
    const result = new ProductsResponse(productsRequest)

    let products = this.products.filter(p => p != null)

    if (
      productsRequest.categories.length > 0 &&
      productsRequest.categories.every(cId => cId !== -1) // 'All categories' option
    ) {
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
      return of(result).pipe(delay(1000))
    }

    products = products.sort(this.getSortingFunction(productsRequest.orderBy))
    result.totalPages = Math.ceil(result.total / productsRequest.pageSize)
    if (productsRequest.page <= result.totalPages - 1) {
      products = products.splice(
        productsRequest.page * productsRequest.pageSize,
        productsRequest.pageSize
      )
      result.page = productsRequest.page
      result.products = products
      return of(result).pipe(delay(1000))
    }

    result.page = 1
    result.products = products.splice(0, productsRequest.pageSize)
    return of(result).pipe(delay(1000))
  }

  getProduct(id: number): Observable<Product> {
    console.log(this.products)
    return of(this.products[id]).pipe(delay(1000))
  }

  protected getSortingFunction(orderBy: OrderBy) {
    if (orderBy.propertyName === 'price') {
      return (a: Product, b: Product) =>
        orderBy.ordering === 'desc' ? b.price - a.price : a.price - b.price
    }

    return (a: Product, b: Product) =>
      orderBy.ordering === 'desc'
        ? b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleLowerCase())
        : a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
  }

  protected save(): void {
    this.cacheService.setItem(this.cacheId, this.products)
  }

  protected seed(): void {
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
