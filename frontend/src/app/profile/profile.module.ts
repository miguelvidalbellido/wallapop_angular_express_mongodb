import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component'; 
import { NoAuthGuard } from '../core/guards/no-auth-guard.service';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    NoAuthGuard
  ]
})
export class ProfileModule {}