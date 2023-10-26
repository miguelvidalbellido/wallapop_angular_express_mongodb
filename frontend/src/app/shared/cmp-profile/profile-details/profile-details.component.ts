import { Component, Input, OnInit } from '@angular/core';
import { Producto, ProductoAndCount, ProductosService, UserProfile, UserService } from 'src/app/core';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit{

  @Input()
  username!: String;

  userData?: UserProfile;
  constructor(
    private productService: ProductosService,
    private _userService: UserService
  ) {

  }

  dataProductsFavourited?: Producto[];
  dataProductsPublished?: Producto[];

  ngOnInit(): void {
    this.loadDataProfile()
  }
  
  loadDataProfile() {
    this.loadDataUser(this.username);
    this.loadFavouritedProducts(this.username);
    this.loadPublishedProducts(this.username);
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

}
