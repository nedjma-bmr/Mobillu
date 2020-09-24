import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterLivraisonProduitsPage } from './ajouter-livraison-produits.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterLivraisonProduitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterLivraisonProduitsPageRoutingModule {}
