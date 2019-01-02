import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'ez-shop-admin',
  template: `
    <mat-toolbar color="accent">
      <a mat-button routerLink="/admin/categories" routerLinkActive="active-link">
        Categories
      </a>
      <a mat-button routerLink="/admin/products" routerLinkActive="active-link">
        Products
      </a>
      <span style="flex:1 1 auto"></span>
      <a mat-button routerLink="/admin/new-category" routerLinkActive="active-link">
        Add Category
      </a>
      <a mat-button routerLink="/admin/product" routerLinkActive="active-link">
        Add Product
      </a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
