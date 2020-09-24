import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifierDevisPage } from './modifier-devis.page';

const routes: Routes = [
  {
    path: '',
    component: ModifierDevisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifierDevisPageRoutingModule {}
