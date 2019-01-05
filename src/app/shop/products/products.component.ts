import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms'
import {
  MatButtonToggleChange,
  MatButtonToggleGroup,
  MatPaginator,
} from '@angular/material'
import { Category, Product } from 'src/app/common/common.interfaces'
import { OrderBy } from 'src/app/common/productsRequest'
import {
  CategoriesShopMockService,
} from 'src/app/common/services/categories-shop-mock.service'

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.categoriesShopService.getCategories().subscribe(cats => {
      this.categories = [...this.categories, ...cats]
      this.initForm()
    })
  }
  ngAfterViewInit() {
    this.sorting.change.subscribe((e: MatButtonToggleChange) => console.log(e.value))
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
