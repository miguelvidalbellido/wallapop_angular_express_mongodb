import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { ListProductsComponent } from './cmp-products/list-products/list-products.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { CardProductComponent } from './cmp-products/card-product/card-product.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
    ListCategoriesComponent,
    ListProductsComponent,
    DetailsProductComponent,
    CardProductComponent
  ],
    exports: [
      ListCategoriesComponent,
      ListProductsComponent,
      DetailsProductComponent,
      CommonModule
    ]
})
export class SharedModule {}