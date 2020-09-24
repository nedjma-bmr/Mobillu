import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImporterDevisPage } from './importer-devis.page';

const routes: Routes = [
  {
    path: '',
    component: ImporterDevisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImporterDevisPageRoutingModule {}
