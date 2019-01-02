import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from '../material.module'
import { BbcodeToHtmlPipe } from '../shared/bbcode-to-html.pipe'
import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin.component'
import { CategoriesComponent } from './categories/categories.component'
import { CategoryDetailsComponent } from './category-details/category-details.component'
import { ProductDetailsComponent } from './product-details/product-details.component'
import { ProductsComponent } from './products/products.component'

@NgModule({
  declarations: [
    AdminComponent,
    BbcodeToHtmlPipe,
    CategoriesComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CategoryDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
