import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterFacturePage } from './ajouter-facture.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterFacturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterFacturePageRoutingModule {}
