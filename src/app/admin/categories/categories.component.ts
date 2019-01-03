import { Component, OnInit } from '@angular/core'
import { Category } from 'src/app/common/common.interfaces'

import { CategoriesService } from '../services/categories.service'

@Component({
  selector: 'ez-shop-categories',
  templateUrl: './categories.component.html',
  styles: [],
})
export class CategoriesComponent implements OnInit {
  categories: Category[]
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(
      cats => (this.categories = cats),
      error => {
        console.log(error)
        // TODO: show error
      }
    )
  }
}
