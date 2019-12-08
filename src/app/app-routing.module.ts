import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'pack-create', loadChildren: './packs/pack-create/pack-create.module#PackCreatePageModule' },
  { path: 'cell-list', loadChildren: './cells/cell-list/cell-list.module#CellListPageModule' },
  { path: 'cell-create', loadChildren: './cells/cell-create/cell-create.module#CellCreatePageModule' },
  { path: 'cell-edit/:id', loadChildren: './cells/cell-create/cell-create.module#CellCreatePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
