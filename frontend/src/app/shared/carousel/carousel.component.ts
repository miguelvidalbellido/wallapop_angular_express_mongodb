import { Component, Input, OnInit } from '@angular/core';
import { Carousel } from 'src/app/core/models/carousel.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent{

  @Input() 
  set dataCarousel(data: Carousel[]){
    if(data){
      console.log(data);

    }
  }
}
