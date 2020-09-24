import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailBonLivraisonPage } from './detail-bon-livraison.page';

const routes: Routes = [
  {
    path: '',
    component: DetailBonLivraisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailBonLivraisonPageRoutingModule {}
