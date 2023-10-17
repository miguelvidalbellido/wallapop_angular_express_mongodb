import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{

  
  constructor(private userService: UserService) {

  }

  user?: User;

  ngOnInit(): void {
    this.userService.update(this.userService.getCurrentUser());

  }
}
