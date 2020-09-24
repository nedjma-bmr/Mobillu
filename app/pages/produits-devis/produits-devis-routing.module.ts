import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitsDevisPage } from './produits-devis.page';

const routes: Routes = [
  {
    path: '',
    component: ProduitsDevisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitsDevisPageRoutingModule {}
