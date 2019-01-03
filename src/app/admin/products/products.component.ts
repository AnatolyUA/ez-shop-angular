import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { MatPaginator } from '@angular/material'
import { merge } from 'rxjs'
import {
  catchError,
  debounceTime,
  delay,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators'
import { Product } from 'src/app/common/common.interfaces'
import { ProductsRequest } from 'src/app/common/productsRequest'

import { ProductsService } from '../services/products.service'

@Component({
  selector: 'ez-shop-products',
  templateUrl: './products.component.html',
  styles: [],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: Product[] = []
  search = new FormControl('', Validators.minLength(2))
  isLoading = false
  @ViewChild(MatPaginator) paginator: MatPaginator
  constructor(private productsService: ProductsService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    merge(this.paginator.page, this.search.valueChanges.pipe(debounceTime(1000)))
      .pipe(
        startWith({}),
        delay(0),
        switchMap(() => {
          this.isLoading = true
          const productsRequest = new ProductsRequest(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.search.value
          )
          return this.productsService.getProducts(productsRequest)
        }),
        map(data => {
          this.isLoading = false
          this.paginator.length = data.total
          this.paginator.pageIndex = data.page
          return data.products
        }),
        catchError(error => {
          this.isLoading = false
          console.log('error', error)
          // TODO: Display notification on error
          return []
        })
      )
      .subscribe(data => (this.products = data))
  }
}
