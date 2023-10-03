import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Carousel, CarouselCategories, CarouselCategoriesMulti } from 'src/app/core/models/carousel.model';
import { Signal } from '@angular/core'


@Component({
  selector: 'app-card-carousel-multi',
  templateUrl: './card-carousel-multi.component.html',
  styleUrls: ['./card-carousel.component.css']
})
export class CardCarouselMultiComponent implements OnInit{

constructor(){ }

  dataTest?: any[]

  @Input()
  set preLoadData(data: any[]){
    if(data){
      this.dataTest = data      
    }
  }

  ngOnInit(): void { }


}