import { TestBed } from '@angular/core/testing';

import { CategoriesShopMockService } from './categories-shop-mock.service';

describe('CategoriesShopMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesShopMockService = TestBed.get(CategoriesShopMockService);
    expect(service).toBeTruthy();
  });
});
