import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit{

constructor(
  private userService: UserService,
  private router: Router,
  private _snackbar: MatSnackBar){

}
currentUser!: User;

// Snackbar
horizontalPosition: MatSnackBarHorizontalPosition = 'end';
verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

  }

  logout() {
    this.showSnackBar();
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  showSnackBar() {
    this._snackbar.open("Sesion cerrada", 'Aceptar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
