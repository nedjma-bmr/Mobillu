import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValiderFacturePage } from './valider-facture.page';

const routes: Routes = [
  {
    path: '',
    component: ValiderFacturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValiderFacturePageRoutingModule {}
