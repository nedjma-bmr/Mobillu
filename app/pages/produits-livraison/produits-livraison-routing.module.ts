import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitsLivraisonPage } from './produits-livraison.page';

const routes: Routes = [
  {
    path: '',
    component: ProduitsLivraisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitsLivraisonPageRoutingModule {}
