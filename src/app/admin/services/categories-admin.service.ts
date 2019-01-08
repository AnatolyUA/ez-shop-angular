import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { CacheService } from 'src/app/common/cache.service'
import { Category } from 'src/app/common/common.interfaces'
import {
  CategoriesShopMockService,
} from 'src/app/common/services/categories-shop-mock.service'

@Injectable({
  providedIn: 'root',
})
export class CategoriesAdminService extends CategoriesShopMockService {
  constructor(protected cacheService: CacheService) {
    super(cacheService)
  }

  getCategory(id: number): Observable<Category> {
    const foundCategory = this.categories[id]
    return of(foundCategory)
  }

  addOrUpdate(category: Category): Observable<Category> {
    if (category.id === 0) {
      category.id = this.categories.length
      this.categories.push(category)
    } else {
      this.categories[category.id] = category
    }
    this.save()
    return of(category)
  }

  remove(id: number): Observable<boolean> {
    this.categories[id] = null
    this.save()
    return of(true)
  }
}
