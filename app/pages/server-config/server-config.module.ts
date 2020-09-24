import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServerConfigPageRoutingModule } from './server-config-routing.module';

import { ServerConfigPage } from './server-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServerConfigPageRoutingModule
  ],
  declarations: [ServerConfigPage]
})
export class ServerConfigPageModule {}
