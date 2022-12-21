import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'form/:id',
    loadChildren: () => import('./page/form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'modelo',
    loadChildren: () => import('./page/modelo/modelo.module').then( m => m.ModeloPageModule)
  },
  {
    path: 'contato',
    loadChildren: () => import('./page/contato/contato.module').then( m => m.ContatoPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./page/sobre/sobre.module').then( m => m.SobrePageModule)
  },
  {
    path: 'detalhes/:id',
    loadChildren: () => import('./page/detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
