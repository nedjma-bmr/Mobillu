import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValiderFacturePageRoutingModule } from './valider-facture-routing.module';

import { ValiderFacturePage } from './valider-facture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ValiderFacturePageRoutingModule
  ],
  declarations: [ValiderFacturePage]
})
export class ValiderFacturePageModule {}
