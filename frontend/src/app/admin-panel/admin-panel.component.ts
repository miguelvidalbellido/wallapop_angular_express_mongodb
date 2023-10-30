import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto, ProductosService, User, UserService } from '../core';
import { ToastrComponent } from '../shared/toastr/toastr.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProductsComponent } from '../shared/cmp-products/create-products/create-products.component';
import { UpdateProductsComponent } from '../shared/cmp-products/update-products/update-products.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  
  constructor(private userService: UserService,
    private productsService: ProductosService,
    private modalService: NgbModal){ }
  
  userInfo!: User
  gridProducts!: Producto[];
  gridUsers!: User[];

  @ViewChild(ToastrComponent) snackBar!: ToastrComponent;

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      (userData) => {
        console.log(userData);
        
        this.userInfo = userData
        this.loadGridProducts();
        this.loadGridUsers();
      }
    );
  }

  loadGridProducts(){
    this.productsService.getPublishedProductsOfUserSelug(false, this.userInfo.username)
    .subscribe((data) => {
      console.log(data);
      
      this.gridProducts = data.products;
    })
  }

  loadGridUsers(){
    // this.userService.(false, this.userInfo.username)
    // .subscribe((data) => {
    //   console.log(data);
      
    //   this.gridProducts = data.products;
    // })
  }

  createProduct(){
    this.modalService.open(CreateProductsComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				console.log('result');
        
			},
			(reason) => {
				console.log(reason);
        
			},
		);
    
  }

  updateProduct(slug: String){
    const modalRef = this.modalService.open(UpdateProductsComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.slug = slug;
    modalRef.result.then((result) => {
      if (result) console.log(result);
    }).catch((res) => console.log(res));    
  }

  deleteProduct(slug: String){    
    if(confirm('¿Está seguro de que quiere eliminar el producto')){
      this.productsService.delete(slug)
      .subscribe((data) => {
        this.snackBar.showSnackBar('Producto eliminado correctamente')
      })
    }
  }
}
