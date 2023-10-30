import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto, ProductosService } from 'src/app/core';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent {
  
  @Output() 
  passEntry: EventEmitter<any> = new EventEmitter();

  @Input() 
  public slug?: String;

  constructor(public modal: NgbActiveModal,
    private productsService: ProductosService){

  }

  modelo!: Producto;
  
  ngOnInit(): void {
      this.productsService.getOne(this.slug)
      .subscribe((data) => {        
        this.modelo = data;
      })
  }

  guardarCambios(e: any){
    this.productsService.update(this.modelo.slug, e)
    .subscribe((data) => {
      console.log(data);
      this.passEntry.emit('Ok');
      this.modal.close('Ok');
    })
  }
}
