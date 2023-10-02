import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

  slugCategory?: String


  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
        if(params.has('slug')){
          this.slugCategory = params.get('slug') || undefined; // Nunca sera undefined ya que no entra en ese caso
        }
      }
    )
    console.log("rdsfdsf");
  }

}
