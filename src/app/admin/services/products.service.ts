import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { CacheService } from 'src/app/common/cache.service'
import { Product } from 'src/app/common/common.interfaces'
import {
  ProductsShopServiceMock,
} from 'src/app/common/services/products-shop-mock.service'

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ProductsShopServiceMock {
  constructor(protected cacheService: CacheService) {
    super(cacheService)
  }

  public addOrUpdateProduct(product: Product): Observable<Product> {
    const id = product.id === 0 ? this.products.length : product.id
    product.id = id
    this.products[id] = product
    this.save()
    return of(this.products[id]).pipe(delay(1000))
  }

  public removeProduct(id: number): Observable<boolean> {
    this.products[id] = null
    this.save()
    return of(true)
  }
}
