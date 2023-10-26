import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
@NgModule({
  imports: [
    SharedModule,
    AdminPanelRoutingModule
  ],
  declarations: [
    AdminPanelComponent
  ],
  providers: [
  ]
})
export class AdminPanelModule {}