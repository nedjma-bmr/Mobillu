import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailBonLivraisonPageRoutingModule } from './detail-bon-livraison-routing.module';

import { DetailBonLivraisonPage } from './detail-bon-livraison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DetailBonLivraisonPageRoutingModule
  ],
  declarations: [DetailBonLivraisonPage]
})
export class DetailBonLivraisonPageModule {}
