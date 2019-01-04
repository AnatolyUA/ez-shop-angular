import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MaterialModule } from '../material.module'
import { BbcodeToHtmlPipe } from '../shared/bbcode-to-html.pipe'
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
    BbcodeToHtmlPipe,
  ],
  imports: [CommonModule, ShopRoutingModule, MaterialModule],
})
export class ShopModule {}
