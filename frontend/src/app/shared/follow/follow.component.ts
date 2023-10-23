import { Component, Input, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/core';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit{

  @Input()
  username!: String;
  user?: User;

  // Snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    
  }

  controlClick(username: String) {
    this.user = this.userService.getCurrentUser();
    
    if(this.user.username === username) {
      console.log("no puedes autoseguirte");
    } else {
      if(Object.entries(this.user).length !== 0) {
      
        console.log(username);
          
      } else {
        this.router.navigate(['/login']);
        this.showSnackBar();
      }
    }
  }

  showSnackBar() {
    this._snackbar.open("Inicia sesión para poder seguir", 'Aceptar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
