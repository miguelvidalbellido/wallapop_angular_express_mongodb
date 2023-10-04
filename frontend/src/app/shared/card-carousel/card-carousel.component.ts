import { Component, OnInit, Input } from '@angular/core';
import { Carousel } from 'src/app/core/models/carousel.model';


@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.css']
})
export class CardCarouselComponent implements OnInit{

  @Input()
  preLoadData!: Carousel;

  constructor() {}

  ngOnInit(): void {    
  }
}
