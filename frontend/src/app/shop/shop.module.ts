import { NgModule } from '@angular/core';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        SharedModule,
        ShopRoutingModule
    ],
    declarations: [
        ShopComponent
    ],
    providers: [
    ]
})
export class ShopModule {}