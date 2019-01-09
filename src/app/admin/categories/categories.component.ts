import { Component, OnInit } from '@angular/core'
import { zip } from 'rxjs'
import { Category } from 'src/app/common/common.interfaces'
import { confirmable } from 'src/app/common/decorators'
import { AppMessagesService } from 'src/app/common/services/app-messages.service'

import { CategoriesAdminService } from '../services/categories-admin.service'
import { ProductsService } from '../services/products.service'

@Component({
  selector: 'ez-shop-categories',
  templateUrl: './categories.component.html',
  styles: [],
})
export class CategoriesComponent implements OnInit {
  loading = true
  categories: Category[]
  numberOfProducts: Array<number>

  constructor(
    private categoriesService: CategoriesAdminService,
    private productsService: ProductsService,
    private messagesService: AppMessagesService
  ) {}

  ngOnInit() {
    zip(
      this.productsService.countProductsForCategories(),
      this.categoriesService.getCategories()
    ).subscribe(data => {
      this.numberOfProducts = data[0]
      this.categories = data[1]
      this.categories.forEach(c => {
        this.numberOfProducts[c.id] = this.numberOfProducts[c.id]
          ? this.numberOfProducts[c.id]
          : 0

        this.loading = false
      })
    })
  }

  @confirmable('Delete {name} category (id = {id})?')
  delete(category: Category) {
    this.loading = true
    this.categoriesService.remove(category.id).subscribe(success => {
      if (success) {
        this.categories = this.categories.filter(c => c.id !== category.id)
      }
      this.loading = false
    })
  }
}
