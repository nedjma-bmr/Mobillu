import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitsCommandPage } from './produits-command.page';

const routes: Routes = [
  {
    path: '',
    component: ProduitsCommandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitsCommandPageRoutingModule {}
