import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MaterialModule } from '../material.module'
import { HomeComponent } from './home/home.component'
import { ProductDetailsComponent } from './product-details/product-details.component'
import { ProductsComponent } from './products/products.component'
import { ShopRoutingModule } from './shop-routing.module'
import { ShopComponent } from './shop.component'

@NgModule({
  declarations: [
    HomeComponent,
    ProductDetailsComponent,
    ProductsComponent,
    ShopComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, MaterialModule],
})
export class ShopModule {}
