export class Category {
  id = 0
  name: string
  description?: string

  constructor(id = 0, name = '', description = '') {
    this.id = id
    this.name = name
    this.description = description
  }
}

export class Product {
  id = 0
  name: string
  description: string
  price: number
  categories: Category[] = []
}
