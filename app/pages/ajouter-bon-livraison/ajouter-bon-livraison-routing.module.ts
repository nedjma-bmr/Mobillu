import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterBonLivraisonPage } from './ajouter-bon-livraison.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterBonLivraisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterBonLivraisonPageRoutingModule {}
