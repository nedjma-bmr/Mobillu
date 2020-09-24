import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandeProduitsImporterPage } from './commande-produits-importer.page';

const routes: Routes = [
  {
    path: '',
    component: CommandeProduitsImporterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandeProduitsImporterPageRoutingModule {}
