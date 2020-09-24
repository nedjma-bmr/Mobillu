import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImporterDevisPageRoutingModule } from './importer-devis-routing.module';

import { ImporterDevisPage } from './importer-devis.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { ProduitsImporterPage } from '../produits-importer/produits-importer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    ImporterDevisPageRoutingModule
  ],
  declarations: [ImporterDevisPage,ProduitsImporterPage],
  entryComponents:[ImporterDevisPage,ProduitsImporterPage]

})
export class ImporterDevisPageModule {}
