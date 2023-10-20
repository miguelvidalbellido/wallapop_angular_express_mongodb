import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Like, ProductosService, User, UserService } from 'src/app/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit{

  @Input()
  slugProduct!: String;
  @Input()
  like!: boolean; 

  user?: User;

  // Snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private userService: UserService,
    private productService: ProductosService,
    private router: Router,
    private _snackbar: MatSnackBar) {

  }

  ngOnInit(): void {

  }

  controlClick(slug: String) {
    this.user = this.userService.getCurrentUser();
    if(Object.entries(this.user).length !== 0) {
      this.productService.favourite(slug).
        subscribe((data) => {
          if(data === true) {
            this.like = this.like ? false : true
          }
    })
      
    } else {
      this.router.navigate(['/login']);
      this.showSnackBar();
    }

  }

  showSnackBar() {
    this._snackbar.open("Inicia sesión para guardar los productos que mas te gustan", 'Aceptar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
