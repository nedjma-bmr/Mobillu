import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutProduitPage } from './ajout-produit.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutProduitPageRoutingModule {}
