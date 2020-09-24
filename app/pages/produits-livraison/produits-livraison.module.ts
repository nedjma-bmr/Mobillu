import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitsLivraisonPageRoutingModule } from './produits-livraison-routing.module';

import { ProduitsLivraisonPage } from './produits-livraison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProduitsLivraisonPageRoutingModule
  ],
  declarations: [ProduitsLivraisonPage]
})
export class ProduitsLivraisonPageModule {}
