import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { of, zip } from 'rxjs'
import { Category, Product } from 'src/app/common/common.interfaces'

import { CategoriesAdminService } from '../services/categories-admin.service'
import { ProductsService } from '../services/products.service'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    )
  }
}

@Component({
  selector: 'ez-shop-product-details',
  templateUrl: './product-details.component.html',
  styles: [],
})
export class ProductDetailsComponent implements OnInit {
  public categories: Category[]
  public productForm: FormGroup
  public matcher = new MyErrorStateMatcher()

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesAdminService,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    const productId = parseInt(this.activatedRoute.snapshot.params['id'], 10)
    const productToEdit =
      productId > 0 ? this.productsService.getProduct(productId) : of(new Product())

    zip(this.categoriesService.getCategories(), productToEdit).subscribe(data => {
      this.categories = data[0]
      const product: Product = data[1]

      this.productForm = this.formBuilder.group({
        id: [product.id, [Validators.required, Validators.pattern('^[0-9]+$')]],
        name: [product.name, Validators.required],
        price: [
          product.price,
          [Validators.required, Validators.pattern('^[0-9][0-9.]*$')],
        ],
        categoriesSelected: [
          product.categories.length,
          [Validators.required, Validators.min(1)],
        ],
        description: [product.description],
        categories: this.formBuilder.array(
          this.categories.map(c =>
            this.formBuilder.control(product.categories.some(pc => pc.id === c.id))
          )
        ),
      })

      this.productForm.controls['categories'].valueChanges.subscribe(
        (value: Boolean[]) => {
          this.productForm.controls['categoriesSelected'].setValue(
            value.filter(c => c).length
          )
        }
      )
    })
  }

  save(formValue: any) {
    if (!this.productForm.valid) {
      return
    }

    const product: Product = {
      id: parseInt(formValue.id, 10),
      description: formValue.description,
      name: formValue.name,
      price: parseFloat(formValue.price),
      categories: this.categories.filter((_, i) => formValue.categories[i]),
    }

    this.productsService.addOrUpdateProduct(product).subscribe(
      data => {
        const productId = this.activatedRoute.snapshot.params['id']
        if (!productId || productId === 0) {
          this.router.navigate(['/admin/product', data.id])
        }
      },
      error => {
        // TODO: Display notifications on error
        console.log(error)
      }
    )
  }
}
