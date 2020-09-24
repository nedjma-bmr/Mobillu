import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImporterBonCommandePage } from './importer-bon-commande.page';

const routes: Routes = [
  {
    path: '',
    component: ImporterBonCommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImporterBonCommandePageRoutingModule {}
