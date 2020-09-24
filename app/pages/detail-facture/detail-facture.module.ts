import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailFacturePageRoutingModule } from './detail-facture-routing.module';

import { DetailFacturePage } from './detail-facture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DetailFacturePageRoutingModule
  ],
  declarations: [DetailFacturePage]
})
export class DetailFacturePageModule {}
