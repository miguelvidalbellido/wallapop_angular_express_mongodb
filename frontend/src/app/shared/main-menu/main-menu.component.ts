import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit{

constructor(private userService: UserService){

}
currentUser!: User;

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      (userData) => {
        console.log(userData);
        
        this.currentUser = userData;
      }
    );

  }
}
