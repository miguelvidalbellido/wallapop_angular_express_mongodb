import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from 'src/app/core';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit{
  
  constructor(){ }

  dataCategories?: Category[]

  ngOnInit(){ }

}
