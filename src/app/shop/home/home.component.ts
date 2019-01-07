import { Component, OnInit } from '@angular/core'
import { zip } from 'rxjs'
import { first } from 'rxjs/operators'
import { Category } from 'src/app/common/common.interfaces'
import { ProductsRequest } from 'src/app/common/productsRequest'
import {
  CategoriesShopMockService,
} from 'src/app/common/services/categories-shop-mock.service'
import {
  ProductsShopServiceMock,
} from 'src/app/common/services/products-shop-mock.service'

@Component({
  selector: 'ez-shop-home',
  template: `
    <div class="wrapper">
      <h1>Shop Categories</h1>
      <mat-progress-bar *ngIf="loading" mode="indeterminate"></mat-progress-bar>
      <div class="flex-blocks">
        <a *ngFor="let cat of categories" [routerLink]="getLink(cat.id)">
          <mat-card matRipple>
            <mat-card-title>{{ cat.name }}</mat-card-title>
            <mat-card-content *ngIf="cat.description">
              <div>{{ cat.description }}</div>
            </mat-card-content>
          </mat-card>
        </a>
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  categories: Category[]
  numberOfProducts: Array<number>
  loading = true
  constructor(
    private categoriesShopMockService: CategoriesShopMockService,
    private productsService: ProductsShopServiceMock
  ) {}

  ngOnInit() {
    zip(
      this.categoriesShopMockService.getCategories(),
      this.productsService.countProductsForCategories()
    )
      .pipe(first())
      .subscribe(data => {
        this.categories = data[0]
        this.numberOfProducts = data[1]
        this.categories = this.categories.filter(c => this.numberOfProducts[c.id] > 0)
        this.loading = false
      })
  }

  getLink(categoryId: number) {
    const rq = ProductsRequest.fromCategoryId(categoryId)
    return ['/shop/products', { request: JSON.stringify(rq) }]
  }
}
