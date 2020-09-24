import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveauBonLivraisonPageRoutingModule } from './nouveau-bon-livraison-routing.module';

import { NouveauBonLivraisonPage } from './nouveau-bon-livraison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NouveauBonLivraisonPageRoutingModule
  ],
  declarations: [NouveauBonLivraisonPage]
})
export class NouveauBonLivraisonPageModule {}
