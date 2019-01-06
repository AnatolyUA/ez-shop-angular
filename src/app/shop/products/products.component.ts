import { Location } from '@angular/common'
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatButtonToggleGroup, MatPaginator } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { merge } from 'rxjs'
import { debounceTime, filter, tap } from 'rxjs/operators'
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
  loading = true
  initialRequest: ProductsRequest
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const requestParam = this.activatedRoute.snapshot.params['request']
    this.initialRequest = requestParam ? JSON.parse(requestParam) : new ProductsRequest()

    this.search = new FormControl('', Validators.minLength(2))
    this.search.setValue(this.initialRequest.keyword)

    this.paginator.pageIndex = this.initialRequest.page
    this.paginator.pageSize = this.initialRequest.pageSize
    this.sorting.value =
      '' +
      this.sorts
        .map(s => s.propertyName + s.ordering)
        .indexOf(
          this.initialRequest.orderBy.propertyName + this.initialRequest.orderBy.ordering
        )
    this.loadProducts(this.initialRequest)
  }

  ngAfterViewInit() {
    this.categoriesShopService.getCategories().subscribe(cats => {
      this.categories = [...this.categories, ...cats]
      this.initForm()
    })
  }

  private initForm() {
    this.categoriesCheckboxes = this.formBuilder.array(
      this.categories.map((c, i) =>
        this.formBuilder.control(
          (i === 0 && this.initialRequest.categories.length === 0) ||
            this.initialRequest.categories.indexOf(c.id) > -1
        )
      )
    )

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
        // to prevent double requests on paginator.firstPage()
        debounceTime(1000),
        tap(() => {
          const productsRequest = new ProductsRequest(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.search.value,
            this.categories
              .filter((_, i) => this.categoriesCheckboxes.value[i])
              .map(c => c.id),
            this.sorts[this.sorting.value]
          )
          const url = this.router
            .createUrlTree([
              '/shop/products',
              { request: JSON.stringify(productsRequest) },
            ])
            .toString()
          this.location.go(url)
          this.loadProducts(productsRequest)
        })
      )
      .subscribe()
  }

  private loadProducts(request: ProductsRequest) {
    this.loading = true
    console.log(request)

    this.productsShopServie.getProducts(request).subscribe(
      data => {
        console.log(data)

        this.paginator.length = data.total
        this.paginator.pageIndex = data.page
        this.products = data.products

        this.loading = false
      },
      error => {
        // TODO: notify error
        console.log(error)
        this.loading = false
      }
    )
  }

  changeCategories(index: number) {
    const value = this.categoriesCheckboxes.value
    const newValue =
      index === 0 && value[0]
        ? value.map((_, i) => i === 0)
        : value.map(
            (v, i) => (i !== 0 && v) || (i === 0 && value.filter(val => val).length === 0)
          )
    this.categoriesCheckboxes.setValue(newValue)
  }
}
