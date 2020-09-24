import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterDevisPage } from './ajouter-devis.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterDevisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterDevisPageRoutingModule {}
