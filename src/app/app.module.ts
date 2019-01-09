import { Injector, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CategoriesShopMockService } from './common/services/categories-shop-mock.service'
import { CategoriesShopService } from './common/services/categories-shop.service'
import { ProductsShopServiceMock } from './common/services/products-shop-mock.service'
import { ProductsShopService } from './common/services/products-shop.service'
import { MaterialModule } from './material.module'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

export let InjectorInstance: Injector
@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [
    {
      provide: ProductsShopService,
      useClass: environment.production ? ProductsShopService : ProductsShopServiceMock,
    },
    {
      provide: CategoriesShopService,
      useClass: environment.production
        ? CategoriesShopService
        : CategoriesShopMockService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    InjectorInstance = injector
  }
}
