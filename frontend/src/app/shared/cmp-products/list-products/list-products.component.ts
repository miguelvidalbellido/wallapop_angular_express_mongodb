import { Component, Input, OnInit } from '@angular/core';
import { Producto, ProductosService } from 'src/app/core';
import { filter } from 'src/app/core/models/filter.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit{
  
  @Input()
  dataSlugCategory?: String;

  dataProducts?: Producto[];

  constructor(private productService: ProductosService){ }

  ngOnInit(): void {
    if(this.dataSlugCategory){
      this.productService.getProductCategory(this.dataSlugCategory)
      .subscribe((data) => {
        this.dataProducts = data;
      })
    }else{
      this.productService.get()
      .subscribe((data) => {
        console.log(data);
        
        this.dataProducts = data;
      })
    }
  }

  getListFiltered(params: filter){
    this.productService.getInfinite(params)
    .subscribe((data) => {      
      this.dataProducts = data
    })
  }
}
