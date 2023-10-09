import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/core';
import { Category } from 'src/app/core/models/category.model';
import { filter } from 'src/app/core/models/filter.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
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

  form!: FormGroup;

  @Output() filterEvent: EventEmitter<filter> = new EventEmitter();

  listCategories!: Category[]; // Listado de categorias para seleccionar //


  ngOnInit(): void {
    this.categoriesService.get()
    .subscribe((data) => {
      this.listCategories = data; 
    })
  }


  Highlights() {
  
  }

  filter_products() {    
    const encodeFormGroupFilter = btoa(JSON.stringify(this.form.value)); // Se codifican los filtros
    this.location.replaceState('/shop/' + `?filters=${encodeFormGroupFilter}`); // Se almacenan en la url
    this.filterEvent.emit(this.form.value);
  }

  remove_all() {
    this.form.reset(); // Borramos los datos de filter
    this.router.navigateByUrl('shop/');
    //window.location.reload(); // No deberia hacer falta pero sinos falla
  }

}
