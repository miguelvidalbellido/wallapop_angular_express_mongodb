import { Component, OnInit } from '@angular/core';
import { CarouselMulti } from '../core/models/carousel.model';
import { CarouselService } from '../core/services/carousel.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  constructor(private carouselService: CarouselService,
    public dialog: MatDialog) { }

  dataCategories!: CarouselMulti[]
  
  ngOnInit(): void { 
    this.carouselService.getCategories()
    .subscribe((data) => {                  
      this.dataCategories = data
    })
  }

  openModal(){
    console.log('holll');
    this.dialog.open(ProfileComponent);
  }
  
}

