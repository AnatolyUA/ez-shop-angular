import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'ez-shop-shop',
  template: `
    <mat-toolbar color="accent">
      <a mat-button routerLink="/shop/home" routerLinkActive="active-link"> Home </a>
      <a mat-button routerLink="/shop/products" routerLinkActive="active-link">
        Products
      </a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class ShopComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
