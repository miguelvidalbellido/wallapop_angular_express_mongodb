import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { paginationConfig } from 'src/app/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  
  // Entradas del componente
  // - numItems --> Cantidad de elementos que hay para listar
  // - numItemsXpage --> Cantidad de elementos a mostrar por página
  
  @Output()
  paginationEvent: EventEmitter<any> = new EventEmitter();

  @Input()
  numItems?: number;

  @Input()
  numItemsXPage!: number;

  numPages!: number;

  constructor() {}
  
  ngOnInit(): void {
    //this.loadPagination()
  }

  ngOnChanges() {
    this.loadPagination();
  }

  loadPagination() {
    if(this.numItems && this.numItemsXPage) {
      this.numPages = Math.ceil(this.numItems / this.numItemsXPage);
    }
  }

  changePage(page: number) {
    const limitAndOffset: any = {};
    limitAndOffset['limit'] = this.numItemsXPage;
    limitAndOffset['offset'] = this.numItemsXPage * (page-1);
    this.paginationEvent.emit(limitAndOffset);
  }

  getRange(num: number): number[] {
    return Array.from({ length: num }, (_, i) => i + 1);
  }
  
}
