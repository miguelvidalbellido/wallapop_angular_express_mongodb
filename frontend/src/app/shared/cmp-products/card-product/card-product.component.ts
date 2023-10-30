import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/core';
import { ToastrComponent } from '../../toastr/toastr.component';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit{
  
  @Input() dataProduct!: Producto;

  @ViewChild(ToastrComponent) snackBar!: ToastrComponent;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    
  }

  redirectUserProfile(username: String){
    if(username !== 'err') {
      this.router.navigate(['/profile/'+username]);
      //this.snackBar.showSnackBar("Inicia sesión para poder seguir");
    }
  }
}
