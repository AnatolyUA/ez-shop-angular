import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { CacheService } from 'src/app/common/cache.service'
import { Category } from 'src/app/common/common.interfaces'

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends CacheService {
  private categories: Category[] = []
  private cacheId = 'categories'
  constructor() {
    super()
    this.categories = this.getItem(this.cacheId)
    if (!this.categories || this.categories.length === 0) {
      this.seed()
    }
  }

  getCategories(): Observable<Category[]> {
    if (this.categories.length < 1) {
      this.seed()
    }

    return of(this.categories.filter(c => c))
  }

  addOrUpdate(category: Category): Observable<boolean> {
    if (category.id === 0) {
      category.id = this.categories.length
      this.categories.push(category)
    } else {
      this.categories[category.id] = category
    }
    this.save()
    return of(true)
  }

  remove(id: number): Observable<boolean> {
    this.categories[id] = null
    this.save()
    return of(true)
  }

  private seed(): void {
    const initialCategories: Category[] = [
      null,
      { id: 1, name: 'Food', description: 'food' },
      { id: 2, name: 'Beverages', description: 'beverages' },
      { id: 3, name: 'Electronics', description: 'electronics' },
      { id: 4, name: 'Transport', description: 'transport' },
      {
        id: 5,
        name: 'Musical instruments',
        description: 'musical instruments',
      },
      { id: 6, name: 'Cellphones', description: 'cellphones' },
      { id: 7, name: 'Glues', description: 'glues' },
      { id: 8, name: 'Adhesives', description: 'adhesives' },
      { id: 9, name: 'Paints', description: 'paints' },
      { id: 10, name: 'Tools', description: 'tools' },
      {
        id: 11,
        name: 'Computer parts',
        description: 'computer parts',
      },
      { id: 12, name: 'Toys', description: 'toys' },
      { id: 13, name: 'Games', description: 'games' },
      { id: 14, name: 'Books', description: 'books' },
      { id: 15, name: 'Films', description: 'films' },
      { id: 16, name: 'Crafts', description: 'crafts' },
      { id: 17, name: 'Footwear', description: 'footwear' },
      { id: 18, name: 'Beauty', description: 'beauty' },
      { id: 19, name: 'Medicines', description: 'medicines' },
      { id: 20, name: 'Gifts', description: 'gifts' },
      { id: 21, name: 'Coins', description: 'coins' },
      { id: 22, name: 'Crafts', description: 'crafts' },
      {
        id: 23,
        name: 'Event tickets',
        description: 'event tickets',
      },
      { id: 24, name: 'DVDs', description: 'DVDs' },
      {
        id: 25,
        name: 'Gift vouchers',
        description: 'gift vouchers',
      },
    ]
    this.categories = initialCategories
    this.save()
  }

  private save(): void {
    this.setItem(this.cacheId, this.categories)
  }
}
