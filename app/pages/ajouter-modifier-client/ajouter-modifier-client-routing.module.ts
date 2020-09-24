import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterModifierClientPage } from './ajouter-modifier-client.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterModifierClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterModifierClientPageRoutingModule {}
