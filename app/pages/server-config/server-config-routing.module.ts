import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerConfigPage } from './server-config.page';

const routes: Routes = [
  {
    path: '',
    component: ServerConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServerConfigPageRoutingModule {}
