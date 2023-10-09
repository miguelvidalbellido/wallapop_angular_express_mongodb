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
  routeFilters: string = ''; // Filtros que vamos a recoger de la ruta //
  filters: filter = new filter(); // Parámetros que enviaremos al Output //

  valueCategories!: any; // Valor al seleccionar una categoria //

  ngOnInit(): void {
    this.categoriesService.get()
    .subscribe((data) => {
      this.listCategories = data; 
    })
  }
  // price_max: number | undefined;
  // price_min: number | undefined;
  // cat_slug: string = "";

  // routeFilters?: string | null;
  // filters?: filter;
  // filterForm?: FormGroup;

  // options: Array<any> = [];
  // selected_state: Array<any> = [];
  // states: Array<any> = [];

  // @Output() filterEvent: EventEmitter<filter> = new EventEmitter();

  // constructor(
  //   private ActivatedRoute: ActivatedRoute, 
  //   private Location: Location,
  //   private Router: Router
  // ) {
  // }
  
  // ngOnInit(): void {
  //   this.ActivatedRoute.snapshot.paramMap.get('filters') != undefined ? this.Highlights() : "";
  //   this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
  //   this.dropdown();
  // }

  // public dropdown() {
  //   this.options = [
  //     { id: 1, name: "Estado del producto", disabled: true},
  //     { id: 2, name: "Nuevo"},
  //     { id: 3, name: "Seminuevo" },
  //     { id: 4, name: "En buen estado" },
  //     { id: 5, name: "En mal estado" }
  //   ];
  // }

  // public price_calc(price_min: number | undefined, price_max: number | undefined) {    
  //   if (typeof price_min == 'number' && typeof price_max == 'number') {
  //     if(price_min > price_max){
  //       this.price_min = price_min;
  //       this.price_max = undefined;
  //     }else{
  //       this.price_min = price_min;
  //       this.price_max = price_max;
  //     }
  //   }
  // }

  // Highlights() {
  //   let routeFilters = JSON.parse(atob(this.ActivatedRoute.snapshot.paramMap.get('filters') || ''));
    
  //   if (routeFilters.search == undefined) {
  //     this.cat_slug = routeFilters.category || '';
  //     this.price_min = routeFilters.price_min;
  //     this.price_max = routeFilters.price_max;
  //     this.selected_state = [];
  //     let options = [];
  //     for (let row in routeFilters.state) {
  //       options.push({name: routeFilters.state[row]});
  //     }
  //     this.selected_state = options || [];
  //   }
  // }

  filter_products() {    
    // this.location.replaceState('/shop/' + btoa(JSON.stringify(this.form.value)));
    
    this.filterEvent.emit(this.form.value);
    
    // console.log(this.filters);
    // this.routeFilters = this.activatedRoute.snapshot.paramMap.get('filters') ?? '';
    // if (this.routeFilters) this.filters = JSON.parse(atob(this.routeFilters));
    
    // if (this.valueCategories) {
    //   this.filters.categories = this.valueCategories
    //   console.log(this.filters);
      
    // }

    // let res_estados = [];
    // for (let row in this.selected_state) {
    //   res_estados.push(this.selected_state[row].name);
    // }
    // this.states = res_estados ? res_estados : [];     

    // if (this.states) {
    //   this.filters.state = this.states;
    // }

    // this.price_calc(this.price_min, this.price_max);
    // this.filters.price_min = this.price_min ? this.price_min : undefined;
    // this.filters.price_max = this.price_max == 0 || this.price_max == null ? undefined : this.price_max;
    // this.filters.offset = 0;

    // this.checkTime(this.filters);
  }

  remove_all() {
    // this.cat_slug = '';
    // this.price_min = undefined;
    // this.price_max = undefined;
    // this.selected_state = [];
    // this.filter_products();
    // setTimeout(() => { this.Router.navigate(['/shop']); }, 200);
  }

  // private checkTime(filters: filter) {
  //   setTimeout(() => {
  //     if (filters === this.filters) {
  //       this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        // this.filterEvent.emit(this.filters);
  //     }
  //   }, 200);
  // }
}
