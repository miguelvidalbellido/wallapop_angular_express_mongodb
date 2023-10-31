import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService, Category, Producto } from 'src/app/core';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {

  constructor(private categoriesService: CategoriesService,
    private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      category: '',
      images: ['https://picsum.photos/200/300'],
      price: ''
    })
  }
  
  form!: FormGroup;
  listCategories!: Category[];

  @Output()
  onSubmit: EventEmitter<Producto> = new EventEmitter<Producto>();

  @Input()
  modelo!: Producto;

  ngOnInit(): void {
    //console.log(this.modelo);
    
    if(this.modelo) this.form.patchValue(this.modelo)

    this.categoriesService.get()
    .subscribe((data) => {
      this.listCategories = data; 
    })
  }

  guardarCambios(){
    //console.log(this.form.value);
    this.onSubmit.emit(this.form.value)
  }
}
