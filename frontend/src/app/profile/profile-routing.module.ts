import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component'; 
import { AuthGuard } from '../core/guards/auth-guard.service'; 

const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent
    //canActivate: [AuthGuard]
  }
  // ,{
    // path: '**',
    // redirectTo: 'home'
  //  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}