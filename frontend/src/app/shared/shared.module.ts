import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { DetailsProductComponent } from './details-product/details-product.component';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
    ListCategoriesComponent,
    ListProductsComponent,
    DetailsProductComponent
  ],
    exports: [
      ListCategoriesComponent,
      ListProductsComponent,
      DetailsProductComponent
    ]
})
export class SharedModule {}