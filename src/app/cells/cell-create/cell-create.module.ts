import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CellCreatePage } from './cell-create.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';


const routes: Routes = [
  {
    path: '',
    component: CellCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PdfViewerModule
  ],
  declarations: [CellCreatePage]
})
export class CellCreatePageModule {}
