import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatPaginator } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { of } from 'rxjs'
import { delay, startWith } from 'rxjs/operators'
import { Category, Product } from 'src/app/common/common.interfaces'
import { ProductsRequest } from 'src/app/common/productsRequest'

import { CategoriesService } from '../services/categories.service'
import { ProductsService } from '../services/products.service'

class ProductForCategory extends Product {
  checked: boolean
  disabled: boolean
  updating: boolean
  constructor(product: Product, categoryId: number) {
    super()
    for (const k in product) {
      if (product.hasOwnProperty(k)) {
        this[k] = product[k]
      }
    }
    this.updating = false
    this.checked = this.categories.some(c => c.id === categoryId)
    this.disabled = this.categories.length < 2 && this.checked
  }
}
@Component({
  selector: 'ez-shop-category-details',
  templateUrl: './category-details.component.html',
  styles: [],
})
export class CategoryDetailsComponent implements OnInit, AfterViewInit {
  categoryForm: FormGroup
  category: Category
  categoryId: number
  products: ProductForCategory[] = []
  displayedColumns: string[] = ['name', 'price', 'addToCategory']
  isNewCategory = true

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const routeId = parseInt(this.activatedRoute.snapshot.params['id'], 10)
    this.categoryId = routeId
    this.isNewCategory = !(routeId > 0)
    this.initForm(routeId)
  }

  ngAfterViewInit() {
    if (this.isNewCategory) {
      return
    }

    this.paginator.page
      .pipe(
        startWith({}),
        delay(0)
      )
      .subscribe(() => this.loadProducts())
  }

  initForm(routeId: number) {
    const category$ =
      routeId > 0 ? this.categoriesService.getCategory(routeId) : of(new Category())

    category$.subscribe(category => {
      this.category = category
      this.categoryForm = this.formBuilder.group({
        id: [category.id, [Validators.required, Validators.pattern('^[0-9]+$')]],
        name: [category.name, [Validators.required, Validators.minLength(3)]],
        description: [category.description],
      })
    })
  }

  save(formValue: any) {
    const category = formValue as Category
    this.categoriesService.addOrUpdate(category).subscribe(savedCategory => {
      this.category = savedCategory
      if (this.isNewCategory) {
        this.router.navigate(['/admin/category', savedCategory.id])
        return
      }
    })
  }

  loadProducts() {
    const productsRequest = this.paginator
      ? new ProductsRequest(this.paginator.pageIndex, this.paginator.pageSize)
      : new ProductsRequest()
    this.productsService.getProducts(productsRequest).subscribe(productsResponse => {
      this.paginator.length = productsResponse.total
      this.products = productsResponse.products.map(
        p => new ProductForCategory(p, this.categoryId)
      )
    })
  }

  change(productForCategory: ProductForCategory) {
    productForCategory.updating = true
    const product = productForCategory as Product
    if (productForCategory.checked) {
      product.categories = product.categories.filter(c => c.id !== this.category.id)
    } else {
      product.categories.push(this.category)
    }
    this.productsService.addOrUpdateProduct(product).subscribe(
      p => {
        productForCategory.checked = !productForCategory.checked
        productForCategory.updating = false
      },
      error => {
        console.log(error)
        productForCategory.updating = false
      }
    )
  }
}
