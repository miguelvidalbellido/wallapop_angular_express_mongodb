import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  @Output() filterEvent: EventEmitter<string> = new EventEmitter();

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
  workingInShop: boolean = this.router.url.includes('/shop');

  ngOnInit(): void {

  }

  searchProductForShop() {
    this.filterEvent.emit(this.form.value.title);
  }

  searchProducts(){
    const DATA_FORM = this.form.value;
    const encodeFormGroupFilter = btoa(JSON.stringify(DATA_FORM)); // Se codifican los filtros
    this.router.navigateByUrl('/shop' + `?filters=${encodeFormGroupFilter}`); // Se almacenan en la url
  }


}
