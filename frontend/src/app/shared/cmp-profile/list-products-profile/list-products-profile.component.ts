import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/core';

@Component({
  selector: 'app-list-products-profile',
  templateUrl: './list-products-profile.component.html',
  styleUrls: ['./list-products-profile.component.css']
})
export class ListProductsProfileComponent implements OnInit{

  constructor() {

  }

  @Input()
  title: String = "";

  @Input()
  dataProducts?: Producto[];

  ngOnInit(): void {

  }

}
