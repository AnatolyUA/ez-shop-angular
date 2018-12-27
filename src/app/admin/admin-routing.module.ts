import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AdminComponent } from './admin.component'
import { CategoriesComponent } from './categories/categories.component'
import { CategoryDetailsComponent } from './category-details/category-details.component'
import { ProductDetailsComponent } from './product-details/product-details.component'
import { ProductsComponent } from './products/products.component'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: '/admin/categories', pathMatch: 'full' },
      { path: 'categories', component: CategoriesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'category/:id', component: CategoryDetailsComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
