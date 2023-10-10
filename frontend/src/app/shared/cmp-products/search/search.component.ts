import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute){
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

  

  searchProducts(){
    // if(this.activatedRoute.snapshot.queryParamMap.get('filters')) {
    //   let encodedFilters = this.activatedRoute.snapshot.queryParamMap.get('filters');
      
    //   if(encodedFilters) {   
    //     console.log(JSON.parse(atob(encodedFilters)));
             
    //     this.form.patchValue(JSON.parse(atob(encodedFilters)))
    //   }
    // }

    const DATA_FORM = this.form.value;
    console.log(DATA_FORM);
    
    const encodeFormGroupFilter = btoa(JSON.stringify(DATA_FORM)); // Se codifican los filtros
    this.router.navigateByUrl('/shop/' + `?filters=${encodeFormGroupFilter}`); // Se almacenan en la url
  }
}
