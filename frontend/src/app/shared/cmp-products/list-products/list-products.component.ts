import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  titleProducts!: String;
  lastParams!: filter;

  isDataLoaded$?: Subscription;

  // Control pagination
  numItems?: number;
  constructor(
    private productService: ProductosService,
    private route: ActivatedRoute) {

    }

  ngOnInit(): void {
    this.controllerRoute();
  }

  controllerRoute() {
    // Comprobamos si tiene filtros la ruta
    if(this.route.snapshot.queryParamMap.get('filters')) {
      let encodedFilters = this.route.snapshot.queryParamMap.get('filters');
      if(encodedFilters) {
        this.getListFiltered(JSON.parse(atob(encodedFilters)));
      }
    }else if(this.dataSlugCategory) {
      this.isDataLoaded$ = this.productService.getProductCategory(this.dataSlugCategory)
      .subscribe((data) => {
        this.dataProducts = data;
        console.log(this.dataProducts);
        
      })
    }else{
      this.getListFiltered(this.lastParams)
    }
  }
  

  getListFiltered(params: filter){
    this.lastParams = params;
    if(this.titleProducts){
      if(!params) {
        params = {}
      }
      params.title = this.titleProducts;
    } 
    this.isDataLoaded$ = this.productService.getInfinite(params)
    .subscribe((data) => {  
      this.dataProducts = data.products;
      this.numItems = data.countProducts;
    })
  }


  saveTitle(title: string) {
    this.titleProducts = title;
    this.getListFiltered(this.lastParams);
  }

  testPagination(data: any) {
    let params: any = {};
    // realizamos la peticion con filtros cuando hayan y si no hay solo pasamos la paginacion
    if(this.lastParams) {
      params = this.lastParams;
    }
    params['limit'] = data.limit;
    params['offset'] = data.offset;

    this.getListFiltered(params)

  }
}
