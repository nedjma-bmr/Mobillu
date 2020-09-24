import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitsCmdPage } from './produits-cmd.page';

const routes: Routes = [
  {
    path: '',
    component: ProduitsCmdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitsCmdPageRoutingModule {}
