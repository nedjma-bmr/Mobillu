import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitsImporterPage } from './produits-importer.page';

const routes: Routes = [
  {
    path: '',
    component: ProduitsImporterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitsImporterPageRoutingModule {}
