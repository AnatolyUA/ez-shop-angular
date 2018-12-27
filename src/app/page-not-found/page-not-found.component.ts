import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'ez-shop-page-not-found',
  template: `
    <p>page-not-found!</p>
    <p>Go back to <a routerLink="/home">home</a></p>
  `,
  styles: [],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
