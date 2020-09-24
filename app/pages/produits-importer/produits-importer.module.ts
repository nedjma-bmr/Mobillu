import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitsImporterPageRoutingModule } from './produits-importer-routing.module';

import { ProduitsImporterPage } from './produits-importer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitsImporterPageRoutingModule
  ],
  declarations: [ProduitsImporterPage]
})
export class ProduitsImporterPageModule {}
