import { Component, OnInit } from '@angular/core'
import { Category } from 'src/app/common/common.interfaces'
import { ProductsRequest } from 'src/app/common/productsRequest'
import {
  CategoriesShopMockService,
} from 'src/app/common/services/categories-shop-mock.service'

@Component({
  selector: 'ez-shop-home',
  template: `
    <div class="wrapper">
      <h1>Shop Categories</h1>
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
  constructor(private categoriesShopMockService: CategoriesShopMockService) {}

  ngOnInit() {
    this.categoriesShopMockService.getCategories().subscribe(cats => {
      this.categories = cats
    })
  }

  getLink(categoryId: number) {
    const rq = ProductsRequest.fromCategoryId(categoryId)
    return ['/shop/products', { request: JSON.stringify(rq) }]
  }
}
