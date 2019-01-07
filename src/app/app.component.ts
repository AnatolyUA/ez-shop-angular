import { Component } from '@angular/core'

@Component({
  selector: 'ez-shop-root',
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="/shop"><h3>EZ Shop</h3></a> <span class="spacer"></span>
      <button mat-mini-fab [routerLink]="['/admin']" matTooltip="Admin area">
        <mat-icon>lock</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'ez-shop-angular'
}
