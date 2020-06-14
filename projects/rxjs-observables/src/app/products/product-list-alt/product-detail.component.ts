import { Component } from '@angular/core';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product;
  productSuppliers = {
    name: '',
    cost: 0,
    minQuantity: 0
  };

  constructor(private productService: ProductService) { }

}
