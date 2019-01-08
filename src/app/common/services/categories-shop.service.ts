import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

import { CacheService } from '../cache.service'
import { Category } from '../common.interfaces'
import { ICategoriesShop } from './interfaces'

@Injectable({
  providedIn: 'root',
})
export class CategoriesShopService implements ICategoriesShop {
  protected categories: Category[] = []
  protected cacheId = 'categories'

  constructor(protected cacheService: CacheService) {
    console.log('CategoriesShopService initialized')
    this.categories = this.cacheService.getItem(this.cacheId)
    if (!this.categories || this.categories.length === 0) {
      this.seed()
    }
  }

  getCategories(): Observable<Category[]> {
    return of(this.categories.filter(c => c)).pipe(delay(1000))
  }

  protected seed(): void {
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

  protected save(): void {
    this.cacheService.setItem(this.cacheId, this.categories)
  }
}
