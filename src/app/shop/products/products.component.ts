import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatButtonToggleGroup, MatPaginator } from '@angular/material'
import { merge } from 'rxjs'
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators'
import { Category, Product } from 'src/app/common/common.interfaces'
import { OrderBy, ProductsRequest } from 'src/app/common/productsRequest'
import {
  CategoriesShopMockService,
} from 'src/app/common/services/categories-shop-mock.service'
import {
  ProductsShopServiceMock,
} from 'src/app/common/services/products-shop-mock.service'

@Component({
  selector: 'ez-shop-products',
  templateUrl: './products.component.html',
  styles: [
    `
      .categories mat-checkbox:first-of-type {
        font-style: italic;
      }
    `,
  ],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: Product[] = []
  categories: Category[] = [new Category(-1, 'All Categories')]
  sorts: OrderBy[] = [
    {
      propertyName: 'name',
      ordering: 'asc',
    },
    {
      propertyName: 'name',
      ordering: 'desc',
    },
    {
      propertyName: 'price',
      ordering: 'asc',
    },
    {
      propertyName: 'price',
      ordering: 'desc',
    },
  ]

  search: FormControl
  categoriesCheckboxes: FormArray

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatButtonToggleGroup) sorting: MatButtonToggleGroup

  constructor(
    private categoriesShopService: CategoriesShopMockService,
    private productsShopServie: ProductsShopServiceMock,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.categoriesShopService.getCategories().subscribe(cats => {
      this.categories = [...this.categories, ...cats]
      this.initForm()
    })
  }
  ngAfterViewInit() {
    const sorting$ = this.sorting.change
    const categories$ = this.categoriesCheckboxes.valueChanges.pipe(debounceTime(100))
    const search$ = this.search.valueChanges.pipe(
      debounceTime(1000),
      filter(keyword => !keyword || keyword.length > 1)
    )
    const paginator$ = this.paginator.page

    merge(sorting$, categories$, search$).subscribe(() => {
      this.paginator.firstPage()
    })

    merge(sorting$, categories$, search$, paginator$)
      .pipe(
        startWith({}),
        debounceTime(10), // to prevent double requests on paginator.firstPage()
        switchMap(() => {
          const productsRequest = new ProductsRequest(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.search.value,
            this.categories
              .filter((_, i) => this.categoriesCheckboxes.value[i])
              .map(c => c.id),
            this.sorts[this.sorting.value]
          )
          console.log(productsRequest)
          return this.productsShopServie.getProducts(productsRequest)
        })
      )
      .subscribe(data => {
        this.paginator.length = data.total
        this.paginator.pageIndex = data.page
        this.products = data.products
        console.log(data)
      })
  }
  private initForm() {
    this.categoriesCheckboxes = this.formBuilder.array(
      this.categories.map(c => this.formBuilder.control(false))
    )
    this.search = new FormControl('', Validators.minLength(2))
  }

  changeCategories(index: number) {
    const value = this.categoriesCheckboxes.value
    const newValue =
      index === 0 && value[0]
        ? value.map((_, i) => i === 0)
        : value.map((v, i) => i !== 0 && v)
    this.categoriesCheckboxes.setValue(newValue)
  }
}
