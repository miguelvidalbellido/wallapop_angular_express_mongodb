import { Component, Input, OnInit } from '@angular/core';
import { Producto, ProductoAndCount, ProductosService } from 'src/app/core';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit{


  constructor(
    private productService: ProductosService
  ) {

  }

  dataProductsFavourited?: Producto[];

  ngOnInit(): void {
    this.loadFavouritedProducts()
  }
  // PETICIO 1 -- Obtenim els productes que ha pujat el usuari
  dataProduct: Producto[] = [
    {
      slug: 'producto-1',
      title: 'Producto 1',
      description: 'Descripción del Producto 1',
      price: 20,
      images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      tagList: ['Tag1', 'Tag2'],
      favouritesCount: 10,
      visitsCount: 100,
      category: 'Categoría 1',
      isFavourited: true
    },
    {
      slug: 'producto-2',
      title: 'Producto 2',
      description: 'Descripción del Producto 2',
      price: 30,
      images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      tagList: ['Tag3'],
      favouritesCount: 5,
      visitsCount: 50,
      category: 'Categoría 2',
      isFavourited: false
    },
    {
      slug: 'producto-2',
      title: 'Producto 2',
      description: 'Descripción del Producto 2',
      price: 30,
      images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      tagList: ['Tag3'],
      favouritesCount: 5,
      visitsCount: 50,
      category: 'Categoría 2',
      isFavourited: false
    },
    {
      slug: 'producto-2',
      title: 'Producto 2',
      description: 'Descripción del Producto 2',
      price: 30,
      images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      tagList: ['Tag3'],
      favouritesCount: 5,
      visitsCount: 50,
      category: 'Categoría 2',
      isFavourited: false
    },
    // Agrega más productos según sea necesario
  ];
  // PETICIO 2 -- Obtenim els productes que el usuri li ha donat like
  
  loadDataProfile() {
    
  }
  
  loadFavouritedProducts() {
    this.productService
      .getFavouritedProductsOfCurrentUser(false)
      .subscribe(
        data => this.dataProductsFavourited = data.products
      );
  }

}
