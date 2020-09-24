import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImporterBonCommandePageRoutingModule } from './importer-bon-commande-routing.module';

import { ImporterBonCommandePage } from './importer-bon-commande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImporterBonCommandePageRoutingModule
  ],
  declarations: [ImporterBonCommandePage]
})
export class ImporterBonCommandePageModule {}
