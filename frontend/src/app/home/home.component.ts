import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../core/models/category.module';
import {
  CategoriesService
} from '../core'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  constructor(
    private router: Router,
    private categoriesService: CategoriesService
    ) {

  }
  
  ngOnInit(): void { }
  
}
