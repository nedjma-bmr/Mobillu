import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaimentFacturePageRoutingModule } from './paiment-facture-routing.module';

import { PaimentFacturePage } from './paiment-facture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaimentFacturePageRoutingModule
  ],
  declarations: [PaimentFacturePage]
})
export class PaimentFacturePageModule {}
