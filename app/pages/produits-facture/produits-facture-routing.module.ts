import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitsFacturePage } from './produits-facture.page';

const routes: Routes = [
  {
    path: '',
    component: ProduitsFacturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitsFacturePageRoutingModule {}
