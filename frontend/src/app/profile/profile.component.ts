import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  
  userLogged?: User;
  user?: String;
  isYourProfile?: boolean;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
 
    this._route.url.subscribe(data => {
      this.user = data[0].path
    })

    this._userService.currentUser.subscribe(data => {
      this.userLogged = data;
      
      this.isYourProfile = (this.userLogged.username === this.user)
      ? true
      : false
      
    });

  }

}
