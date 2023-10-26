import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductosService, User, UserService } from '../core';
import { Carousel } from '../core/models/carousel.model';
import { ToastrComponent } from '../shared/toastr/toastr.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private productosService: ProductosService,
    private userService: UserService){
  }

  slug?: String

  dataProduct: Producto | undefined;
  carouselImages?: Carousel;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if(params.has('slug')){
        this.slug = params.get('slug') || undefined; // Nunca sera undefined ya que no entra en ese caso

        this.productosService.getOne(this.slug)
        .subscribe((data) => {       
          this.dataProduct = data;
          this.carouselImages = data;          
        })
      }
    })
  }
}
