import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaimentFacturePage } from './paiment-facture.page';

const routes: Routes = [
  {
    path: '',
    component: PaimentFacturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaimentFacturePageRoutingModule {}
