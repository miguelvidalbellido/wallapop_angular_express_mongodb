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

  @Input()
  follow!: boolean;

  // Snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void { }

  controlClick(username: String) {
    this.user = this.userService.getCurrentUser();
    
    if(this.user.username === username) {
      this.showSnackBar("No puedes seguirte a ti mismo");
    } else {
      if(Object.entries(this.user).length !== 0) {
        this.userService.follow(username)
        .subscribe((data) => {
          if(data)
          this.follow = this.follow ? false : true;
        })
      } else {
        this.router.navigate(['/login']);
        this.showSnackBar("Inicia sesión para poder seguir");
      }
    }
  }

  showSnackBar(msg: string) {
    this._snackbar.open(msg, 'Aceptar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
