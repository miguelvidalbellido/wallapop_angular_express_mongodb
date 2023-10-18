
import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService } from 'src/app/core';

@Component({
  selector: 'app-list-products-infinite',
  templateUrl: './list-products-infinite.component.html',
  styleUrls: ['./list-products-infinite.component.css']
})
export class ListProductsInfiniteComponent implements OnInit{

  products: Producto[] = [];
  offset: number = 0;
  count: number = 0;

  constructor( private productsService: ProductosService ) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getRequestParams(offset: Number, limit: number) {
    const params: any = {};

    params['offset'] = offset;
    params['limit'] = limit;

    return params;
  }

  getProducts() {
    const QUANTITY_PRODUCTS = 3;
    const params = this.getRequestParams(this.offset, QUANTITY_PRODUCTS);
    if(this.count < 2) {
      this.productsService.getInfinite(params).subscribe(
        (data) => {
          this.products = this.products.concat(data.products);
          this.offset = this.offset + 3;
        },
        (error) => {
          // Mostrar error
        }
      )
    }
    

    this.count++;

  }

  scroll() {
    this.getProducts();
  }

}