import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/core';
import { Carousel, CarouselCategories, CarouselCategoriesMulti } from 'src/app/core/models/carousel.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

  @Input() 
  set dataCarousel(data: Carousel[]){
    if(data){
      console.log(data);
    }
  }

  @Input() 
  set dataCarouselMulti(data: CarouselCategories[]){
    if(data){
      this.prova = data      
    }
  }

  prova!: CarouselCategories[]
  prova2!: any;

  slides: Carousel = {
    slug: 'test',
    images: ['https://mdbootstrap.com/img/Photos/Slides/img%20(15).webp',
    'https://mdbootstrap.com/img/Photos/Slides/img%20(22).webp',
    'https://mdbootstrap.com/img/Photos/Slides/img%20(23).webp']
  };

  constructor() { }

  ngOnInit(): void {
  
  }
}
