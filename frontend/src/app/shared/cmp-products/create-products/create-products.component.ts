import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from 'src/app/core';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {
  
  @Output() 
  passEntry: EventEmitter<any> = new EventEmitter();

  constructor(public modal: NgbActiveModal,
    private productsService: ProductosService){

  }
  
  ngOnInit(): void {
      
  }

  guardarCambios(e: any){
    console.log(e);
    this.productsService.create(e)
    .subscribe((data) => {
      console.log(data);
      this.passEntry.emit('Ok');
      this.modal.close('Ok');
    })
  }
}
