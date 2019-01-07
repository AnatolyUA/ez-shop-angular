import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Product } from 'src/app/common/common.interfaces'
import { ProductsRequest } from 'src/app/common/productsRequest'
import {
  ProductsShopServiceMock,
} from 'src/app/common/services/products-shop-mock.service'

@Component({
  selector: 'ez-shop-product-details',
  template: `
    <mat-progress-bar *ngIf="loading" mode="indeterminate"></mat-progress-bar>
    <div class="wrapper" *ngIf="product">
      <h1>{{ product.name }}</h1>
      <div class="price">Price: {{ product.price }}</div>
      <div [innerHTML]="product.description | bbcodeToHtml"></div>
      Available in:
      <a
        mat-button
        [routerLink]="getLink(cat.id)"
        *ngFor="let cat of product.categories"
        >{{ cat.name }}</a
      >
    </div>
  `,
  styles: [],
})
export class ProductDetailsComponent implements OnInit {
  product: Product
  loading = true
  constructor(
    private activatedRote: ActivatedRoute,
    private productsService: ProductsShopServiceMock
  ) {}

  ngOnInit() {
    const id = parseInt(this.activatedRote.snapshot.params['id'], 10)
    this.productsService.getProduct(id).subscribe(
      p => {
        this.product = p
        this.loading = false
      },
      error => {
        // TODO: show notification on error
        console.log(error)
        this.loading = false
      }
    )
  }

  getLink(categoryId: number) {
    const rq = ProductsRequest.fromCategoryId(categoryId)
    return ['/shop/products', { request: JSON.stringify(rq) }]
  }
}
