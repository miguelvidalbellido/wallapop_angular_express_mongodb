import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { ListProductsComponent } from './cmp-products/list-products/list-products.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { CardProductComponent } from './cmp-products/card-product/card-product.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';
import { MdbCarouselModule  } from 'mdb-angular-ui-kit/carousel';
import { CardCarouselMultiComponent } from "./card-carousel";
import { ListProductsInfiniteComponent } from './cmp-products/list-products-infinite/list-products-infinite.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import {MatCardModule} from '@angular/material/card';
import { FiltersComponent } from './cmp-products/filters';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './cmp-products/search/search.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MdbCarouselModule,
        InfiniteScrollModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule
    ],
    declarations: [
    ListCategoriesComponent,
    ListProductsComponent,
    DetailsProductComponent,
    CardProductComponent,
    CarouselComponent,
    CardCarouselComponent,
    CardCarouselMultiComponent,
    ListProductsInfiniteComponent,
    FiltersComponent,
    SearchComponent,
    PaginationComponent
  ],
    exports: [
      ListCategoriesComponent,
      ListProductsComponent,
      DetailsProductComponent,
      CommonModule,
      CarouselComponent,
      MdbCarouselModule,
      ListProductsInfiniteComponent,
      FiltersComponent,
      MatSelectModule,
      MatInputModule,
      SearchComponent,
      PaginationComponent
    ]
})
export class SharedModule {}