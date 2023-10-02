import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Carousel, CarouselCategories } from 'src/app/core/models/carousel.model';
import { Signal } from '@angular/core'


@Component({
  selector: 'app-card-carousel-multi',
  templateUrl: './card-carousel-multi.component.html',
  styleUrls: ['./card-carousel.component.css']
})
export class CardCarouselMultiComponent implements OnInit{

constructor(){ }

  @Input()
  set preLoadData(data: CarouselCategories[]){
    if(data){
      // this.restoDivision = Array.from(Array(Math.ceil(data.length / 4)).keys())        
      console.log(this.restoDivision);
    }
  }

  @Input()
  set restoDivision(data: any){
    if(data){
      console.log(data);
    }
  }

  // restoDivision!: any;

  ngOnInit(): void { 
    console.log(this.restoDivision);
       
  }
}