import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-details',
  templateUrl: './carousel-details.component.html',
  styleUrls: ['./carousel-details.component.css']
})
export class CarouselDetailsComponent implements OnInit{

  @Input()
  images?: String[];

  constructor() {

  }

  ngOnInit(): void {
    
  }
}
