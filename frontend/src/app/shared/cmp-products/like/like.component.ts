import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService, User, UserService } from 'src/app/core';
import { ToastrComponent } from '../../toastr/toastr.component';
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

  @Input()
  numLikes!: number;
  user?: User;

  @ViewChild(ToastrComponent) snackBar!: ToastrComponent;

  constructor(
    private userService: UserService,
    private productService: ProductosService,
    private router: Router) { }

  ngOnInit(): void { }

  controlClick(slug: String) {
    this.user = this.userService.getCurrentUser();
    if(Object.entries(this.user).length !== 0) {
      this.productService.favourite(slug).
        subscribe((data) => {
          if(data === true) {
            this.like = this.like 
                        ? false 
                        : true
            this.like 
              ? this.numLikes += 1
              : this.numLikes -= 1
          }
    })
      
    } else {
      this.router.navigate(['/login']);
      this.snackBar.showSnackBar("Inicia sesión para guardar los productos que mas te gustan")
    }
  }
}
