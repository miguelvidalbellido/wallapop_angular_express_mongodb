import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-carousel-multi',
  templateUrl: './card-carousel-multi.component.html',
  styleUrls: ['./card-carousel.component.css']
})
export class CardCarouselMultiComponent implements OnInit{

constructor(private router: Router,
  private formBuilder: FormBuilder){ 
    this.form = this.formBuilder.group({
      limit: '',
      offset: '',
      title: '',
      categories: [],
      price_min: '',
      price_max: '',
      order: ''
    });
  }

  form!: FormGroup

  dataTest?: any[]

  @Input()
  set preLoadData(data: any[]){
    if(data) this.dataTest = data
  }

  ngOnInit(): void { }

  redirectShop(category: string){
    this.form.get('categories')?.setValue([category])
    const DATA_FORM = this.form.value;
    console.log(DATA_FORM);
    
    const encodeFormGroupFilter = btoa(JSON.stringify(DATA_FORM)); // Se codifican los filtros
    this.router.navigateByUrl('/shop' + `?filters=${encodeFormGroupFilter}`); // Se almacenan en la url
  }
}