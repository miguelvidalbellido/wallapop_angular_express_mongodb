import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/core';
import { ToastrComponent } from '../toastr/toastr.component';

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

  @ViewChild(ToastrComponent) snackBar!: ToastrComponent;

  constructor(
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void { }

  controlClick(username: String) {
    this.user = this.userService.getCurrentUser();
    
    if(this.user.username === username) {
      this.snackBar.showSnackBar("No puedes seguirte a ti mismo")
    } else {
      if(Object.entries(this.user).length !== 0) {
        this.userService.follow(username)
        .subscribe((data) => {
          if(data)
          this.follow = this.follow ? false : true;
        })
      } else {
        this.router.navigate(['/login']);
        this.snackBar.showSnackBar("Inicia sesión para poder seguir");
      }
    }
  }
}
