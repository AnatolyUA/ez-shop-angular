import { Product } from './common.interfaces'

export class OrderBy {
  propertyName: string
  ordering: 'asc' | 'desc' = 'asc'
}

export class ProductsRequest {
  public keyword: string
  public categories: number[]
  public orderBy: OrderBy

  public page: number
  public pageSize: number

  constructor(
    page = 1,
    pageSize = 10,
    keyword = '',
    categories = [],
    orderBy: OrderBy = { propertyName: 'name', ordering: 'asc' }
  ) {
    this.page = page
    this.pageSize = pageSize
    this.keyword = keyword
    this.categories = categories
    this.orderBy = orderBy
  }
}

export class ProductsResponse {
  public products: Product[]
  public productsRequest: ProductsRequest

  public page: number
  public total: number
  public totalPages: number

  constructor(productsRequest = new ProductsRequest()) {
    this.page = 0
    this.total = 0
    this.totalPages = 0
    this.products = []
    this.productsRequest = productsRequest
  }
}
