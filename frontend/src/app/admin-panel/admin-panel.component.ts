import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto, ProductosService, ProfileStats, User, UserService } from '../core';
import { ToastrComponent } from '../shared/toastr/toastr.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProductsComponent } from '../shared/cmp-products/create-products/create-products.component';
import { UpdateProductsComponent } from '../shared/cmp-products/update-products/update-products.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  
  constructor(private userService: UserService,
    private productsService: ProductosService,
    private modalService: NgbModal,
    private router: Router){ }
  
  userInfo!: User
  gridProducts!: Producto[];
  gridUsers!: User[];

  statsData!: ProfileStats;

  @ViewChild(ToastrComponent) snackBar!: ToastrComponent;

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      (userData) => {
        //console.log(userData);
        
        this.userInfo = userData
        this.loadGridProducts();
        this.loadGridUsers();
        this.loadProfileStats();
      }
    );
  }

  loadGridProducts(){
    this.productsService.getPublishedProductsOfUserSelug(false, this.userInfo.username)
    .subscribe((data) => {
      //console.log(data);
      
      this.gridProducts = data.products;
    })
  }

  loadGridUsers(){
     this.userService.checkUsersFollowed()
     .subscribe((data) => {
      //console.log(data);
       this.gridUsers = data;
     })
  }

  createProduct(){
    this.modalService.open(CreateProductsComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        if (result) {
          this.snackBar.showSnackBar('Producto creado correctamente')
          this.loadGridProducts();
          this.loadProfileStats();
        }
			},
			(reason) => {
				//console.log(reason);
        
			},
		);
    
  }

  updateProduct(slug: String){
    const modalRef = this.modalService.open(UpdateProductsComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.slug = slug;
    modalRef.result.then((result) => {
      //if (result) console.log(result);
      this.loadGridProducts();
    }).catch((res) => console.log(res));    
  }

  deleteProduct(slug: String){    
    if(confirm('¿Está seguro de que quiere eliminar el producto')){
      this.productsService.delete(slug)
      .subscribe((data) => {
        this.snackBar.showSnackBar('Producto eliminado correctamente');
        this.loadGridProducts();
      })
    }
  }

  removeUserFollow(username: String){
    this.userService.follow(username)
    .subscribe((data) => {
      if(data === true) this.loadGridUsers();
      this.snackBar.showSnackBar('Se acaba de dejar de seguir al usuario: '+username)
    })
  }

  loadProfileStats() {
    this.userService.getProfileStats()
    .subscribe((data) => {
      this.statsData = data;
    })
  }

  logout() {
    this.snackBar.showSnackBar("Sesion cerrada")
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

}
