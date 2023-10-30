import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/core';
import { ToastrComponent } from '../toastr/toastr.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit{

  constructor(
    private userService: UserService,
    private router: Router){ }

  @ViewChild(ToastrComponent) snackBar!: ToastrComponent;

  currentUser!: User;

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  logout() {
    this.snackBar.showSnackBar("Sesion cerrada")
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
