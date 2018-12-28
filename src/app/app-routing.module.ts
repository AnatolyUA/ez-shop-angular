import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [
  { path: '', redirectTo: '/shop/home', pathMatch: 'full' },
  { path: 'shop', loadChildren: './shop/shop.module#ShopModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
