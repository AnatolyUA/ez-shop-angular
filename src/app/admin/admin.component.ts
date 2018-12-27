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
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
