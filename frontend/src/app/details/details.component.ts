import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductosService } from '../core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private productosService: ProductosService){
  }

  slug?: String

  dataProduct: Producto | undefined;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if(params.has('slug')){
        this.slug = params.get('slug') || undefined; // Nunca sera undefined ya que no entra en ese caso

        this.productosService.getOne(this.slug)
        .subscribe((data) => {          
          this.dataProduct = data;
        })
      }
    })
  }
}
