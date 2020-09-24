import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouveauBonLivraisonPage } from './nouveau-bon-livraison.page';

const routes: Routes = [
  {
    path: '',
    component: NouveauBonLivraisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouveauBonLivraisonPageRoutingModule {}
