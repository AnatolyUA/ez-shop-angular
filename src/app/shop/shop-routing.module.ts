import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ProductDetailsComponent } from '../admin/product-details/product-details.component'
import { ProductsComponent } from '../admin/products/products.component'
import { HomeComponent } from './home/home.component'
import { ShopComponent } from './shop.component'

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      { path: 'product/:slug', component: ProductDetailsComponent },
      { path: 'categories/:slag', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'home', component: HomeComponent },
      { path: '' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
