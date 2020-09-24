import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitsFacturePageRoutingModule } from './produits-facture-routing.module';

import { ProduitsFacturePage } from './produits-facture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProduitsFacturePageRoutingModule
  ],
  declarations: [ProduitsFacturePage]
})
export class ProduitsFacturePageModule {}
