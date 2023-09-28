import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../core/models/category.model';
import {
  CategoriesService
} from '../core'
import { Carousel } from '../core/models/carousel.model';
import { CarouselService } from '../core/services/carousel.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  constructor(
    private router: Router,
    private carouselService: CarouselService
    ) { }

  dataCategories!: Carousel[]
  
  ngOnInit(): void { 
    this.carouselService.getCategories()
    .subscribe((data) => {      
      this.dataCategories = data
    })
  }
  
}

