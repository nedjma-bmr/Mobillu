import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitsCommandPageRoutingModule } from './produits-command-routing.module';

import { ProduitsCommandPage } from './produits-command.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitsCommandPageRoutingModule
  ],
  declarations: [ProduitsCommandPage]
})
export class ProduitsCommandPageModule {}
