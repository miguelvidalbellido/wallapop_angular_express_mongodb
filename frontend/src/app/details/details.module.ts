import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';

@NgModule({
  imports: [
    SharedModule,
    DetailsRoutingModule
  ],
  declarations: [
    DetailsComponent
  ],
  providers: [
  ]
})
export class DetailsModule {}