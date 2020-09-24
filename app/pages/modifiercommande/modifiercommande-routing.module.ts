import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifiercommandePage } from './modifiercommande.page';

const routes: Routes = [
  {
    path: '',
    component: ModifiercommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifiercommandePageRoutingModule {}
