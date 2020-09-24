import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailDevisPageRoutingModule } from './detail-devis-routing.module';

import { DetailDevisPage } from './detail-devis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DetailDevisPageRoutingModule
  ],
  declarations: [DetailDevisPage]
})
export class DetailDevisPageModule {}
