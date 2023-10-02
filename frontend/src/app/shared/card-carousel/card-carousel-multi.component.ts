import { Component, OnInit, Input } from '@angular/core';
import { Carousel } from 'src/app/core/models/carousel.model';


@Component({
  selector: 'app-card-carousel-multi',
  templateUrl: './card-carousel-multi.component.html',
  styleUrls: ['./card-carousel.component.css']
})
export class CardCarouselMultiComponent implements OnInit{


  @Input()
  preLoadData?: Carousel;

  // @Input()
  // set preLoadData(slide: Carousel){
  //   console.log(slide);
  // }

  constructor() {}

  ngOnInit(): void {

  }
}