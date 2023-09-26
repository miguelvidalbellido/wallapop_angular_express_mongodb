import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from 'src/app/core';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit{
  
  constructor(private categoriesService: CategoriesService){
    
  }

  dataCategories?: Category[]

  ngOnInit(){
    this.categoriesService.get()
    .subscribe((data) => {
      this.dataCategories = data
      
      console.log(this.dataCategories);
      
    })
  }

}
