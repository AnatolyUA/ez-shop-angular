import { Component, OnInit } from '@angular/core'
import { zip } from 'rxjs'
import { Category } from 'src/app/common/common.interfaces'
import { AppMessagesService } from 'src/app/common/services/app-messages.service'

import { CategoriesService } from '../services/categories.service'
import { ProductsService } from '../services/products.service'

@Component({
  selector: 'ez-shop-categories',
  templateUrl: './categories.component.html',
  styles: [],
})
export class CategoriesComponent implements OnInit {
  categories: Category[]
  numberOfProducts: Array<number>

  constructor(
    private categoriesService: CategoriesService,
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
      })
    })
  }

  delete(category: Category) {
    this.messagesService.confirmAction(
      `Delete category ${category.name}?`,
      'Delete',
      this.getDeleteCategoryFunc(category.id)
    )
  }
  private getDeleteCategoryFunc(id: number): Function {
    return () => {
      this.categoriesService.remove(id).subscribe(success => {
        if (success) {
          this.categories = this.categories.filter(c => c.id !== id)
        }
      })
    }
  }
}
