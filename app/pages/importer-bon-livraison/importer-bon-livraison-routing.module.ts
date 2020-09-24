import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImporterBonLivraisonPage } from './importer-bon-livraison.page';

const routes: Routes = [
  {
    path: '',
    component: ImporterBonLivraisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImporterBonLivraisonPageRoutingModule {}
