import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import {
  SharedModule
} from './shared'
import { CoreModule } from './core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopModule } from './shop/shop.module';
import { DetailsComponent } from './details/details.component';
import { DetailsModule } from './details/details.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HomeModule,
    ShopModule,
    DetailsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
