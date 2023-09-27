import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent{
  @Input() dataProduct!: Producto;
}
