import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Like, ProductosService, User, UserService } from 'src/app/core';

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


  constructor(
    private userService: UserService,
    private productService: ProductosService,
    private router: Router) {

  }

  ngOnInit(): void {

  }

  controlClick(slug: String) {
    this.user = this.userService.getCurrentUser();
    if(Object.entries(this.user).length !== 0) {
      console.log("dsadas");
      this.productService.favourite(slug).
        subscribe((data) => {
          if(data === true) {
            this.like = this.like ? false : true
          }
    })
      
    } else {
      this.router.navigate(['/login']);
      // toaster wapo
    }

  }

}
