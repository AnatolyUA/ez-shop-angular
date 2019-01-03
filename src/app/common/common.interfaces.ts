export interface Category {
  id: number
  name: string
  description?: string
}

export class Product {
  id = 0
  name: string
  description: string
  price: number
  categories: Category[] = []
}
