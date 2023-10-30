import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Producto, ProductoAndCount, ProductosService, User, UserProfile, UserService } from 'src/app/core';
import { ToastrComponent } from '../../toastr/toastr.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit{

  @Input()
  username!: String;
  user?: User;
  userData?: UserProfile;
  showFollow: boolean = false;
  isFollowing: String = 'Seguir';
  constructor(
    private productService: ProductosService,
    private _userService: UserService,
    private router: Router
  ) {

  }

  dataProductsFavourited?: Producto[];
  dataProductsPublished?: Producto[];

  @ViewChild(ToastrComponent) snackBar!: ToastrComponent;

  ngOnInit(): void {
    this.loadDataProfile()
  }
  
  loadDataProfile() {
    this.loadDataUser(this.username);
    this.loadFavouritedProducts(this.username);
    this.loadPublishedProducts(this.username);
    this.checkIfUserIsLogged();
  }
  
  loadFavouritedProducts(_username: String) {
    this.productService
      .getFavouritedProductsOfUserSlug(false, _username)
      .subscribe(
        data => this.dataProductsFavourited = data.products
      );
      
  }

  loadPublishedProducts(_username: String) {
    this.productService
      .getPublishedProductsOfUserSelug(false, _username)
      .subscribe(
        data => {
          this.dataProductsPublished = data.products;
        }
      );
  }

  loadDataUser(_username: String) {
    this._userService.getDataUserProfile(_username).subscribe(
      data => {
        this.userData = data;
      }
    )
  }

  checkIfUserIsLogged() {
    this._userService.currentUser.subscribe(data => {
      const userLogged = data;
      
      this.showFollow = (userLogged.username === this.username)
      ? false
      : true

      if(this.showFollow) {
        this._userService.checkIfUserLoggedIsFollowing(this.username).subscribe(
          data => {
            this.isFollowing = data ? 'Dejar de seguir' : 'Seguir';
          }
        )
      }
      
    });
  }

  controlClickFollow() {
    this.user = this._userService.getCurrentUser();
    if(Object.entries(this.user).length !== 0) {
      this._userService.follow(this.username)
      .subscribe((data) => {
        if(data)
        this.isFollowing = (this.isFollowing === "Dejar de seguir") ? 'Seguir' : 'Dejar de seguir'; 
      })
    } else {
      this.router.navigate(['/login']);
        this.snackBar.showSnackBar("Inicia sesión para poder seguir");
    }
  }

}