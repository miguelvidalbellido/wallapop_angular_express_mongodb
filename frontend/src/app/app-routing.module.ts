import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
   {
     path: 'home',
     loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
   },
   {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
   },
   {
    path: 'details',
    loadChildren: () => import('./details/details.module').then(m => m.DetailsModule)
   },
   {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
   },
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: QuicklinkStrategy,
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}