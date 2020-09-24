import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitsDevisPageRoutingModule } from './produits-devis-routing.module';

import { ProduitsDevisPage } from './produits-devis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitsDevisPageRoutingModule
  ],
  declarations: [ProduitsDevisPage]
})
export class ProduitsDevisPageModule {}
