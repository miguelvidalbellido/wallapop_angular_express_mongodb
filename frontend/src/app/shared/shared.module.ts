import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListCategoriesComponent } from './list-categories/list-categories.component';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
    ListCategoriesComponent
  ],
    exports: [
      ListCategoriesComponent
    ]
})
export class SharedModule {}