import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ShopRoutingModule } from './shop-routing.module'
import { HomeComponent } from './home/home.component'
import { ProductDetailsComponent } from './product-details/product-details.component'
import { ProductsComponent } from './products/products.component'

@NgModule({
  declarations: [HomeComponent, ProductDetailsComponent, ProductsComponent],
  imports: [CommonModule, ShopRoutingModule],
})
export class ShopModule {}
