import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  // {
  //   path: 'productos',
  //   loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule)
  // }
];

@NgModule({
  imports: [
  //   QuicklinkModule,
  //   RouterModule.forRoot(routes, {
  //     // preload all modules; optionally we could
  //     // implement a custom preloading strategy for just some
  //     // of the modules (PRs welcome 😉)
  //     preloadingStrategy: QuicklinkStrategy
  // })
],
    exports: [RouterModule]
})
export class AppRoutingModule { }
