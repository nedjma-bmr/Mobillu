import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandeProduitsImporterPageRoutingModule } from './commande-produits-importer-routing.module';

import { CommandeProduitsImporterPage } from './commande-produits-importer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CommandeProduitsImporterPageRoutingModule
  ],
  declarations: [CommandeProduitsImporterPage]
})
export class CommandeProduitsImporterPageModule {}
