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
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list'
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShowAuthedDirective } from './show-authed.directive';
import { SettingsComponent } from './cmp-profile/settings/settings.component';
import {MatTabsModule} from '@angular/material/tabs';
import { LikeComponent } from './cmp-products/like/like.component';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { ProfileDetailsComponent } from './cmp-profile/profile-details/profile-details.component';
import { ListProductsProfileComponent } from './cmp-profile/list-products-profile/list-products-profile.component';
import { FollowComponent } from './follow/follow.component';
import { ListCommentsComponent } from './cmp-comments/list-comments/list-comments.component';
import { CardCommentComponent } from './cmp-comments/card-comment/card-comment.component';
import { ToastrComponent } from './toastr/toastr.component';

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
        MatInputModule,
        MatMenuModule,
        MatButtonModule,
        MatGridListModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule
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
    PaginationComponent,
    MainMenuComponent,
    FooterComponent,
    ShowAuthedDirective,
    SettingsComponent,
    LikeComponent,
    ProfileDetailsComponent,
    ListProductsProfileComponent,
    FollowComponent,
    ListCommentsComponent,
    CardCommentComponent,
    ToastrComponent
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
      PaginationComponent,
      MatMenuModule,
      MatButtonModule,
      MainMenuComponent,
      FooterComponent,
      MatGridListModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatSnackBarModule,
      ShowAuthedDirective,
      SettingsComponent,
      MatTabsModule,
      LikeComponent,
      MatIconModule,
      ProfileDetailsComponent,
      ListProductsProfileComponent,
      FollowComponent,
      ListCommentsComponent,
      ToastrComponent,
      MatDialogModule
    ]
})
export class SharedModule {}