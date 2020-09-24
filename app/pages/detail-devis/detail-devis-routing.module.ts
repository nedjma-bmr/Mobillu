import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailDevisPage } from './detail-devis.page';

const routes: Routes = [
  {
    path: '',
    component: DetailDevisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailDevisPageRoutingModule {}
