import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImporterBonLivraisonPageRoutingModule } from './importer-bon-livraison-routing.module';

import { ImporterBonLivraisonPage } from './importer-bon-livraison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule , 
    ImporterBonLivraisonPageRoutingModule
  ],
  declarations: [ImporterBonLivraisonPage]
})
export class ImporterBonLivraisonPageModule {}
