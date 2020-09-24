import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailFacturePage } from './detail-facture.page';

const routes: Routes = [
  {
    path: '',
    component: DetailFacturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailFacturePageRoutingModule {}
