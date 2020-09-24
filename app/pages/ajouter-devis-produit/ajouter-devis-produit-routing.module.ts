import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterDevisProduitPage } from './ajouter-devis-produit.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterDevisProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterDevisProduitPageRoutingModule {}
