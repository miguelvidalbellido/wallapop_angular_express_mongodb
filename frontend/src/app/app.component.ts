import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.populate();
  }
}

