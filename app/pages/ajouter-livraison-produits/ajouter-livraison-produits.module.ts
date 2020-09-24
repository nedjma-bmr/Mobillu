import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';

import { AjouterLivraisonProduitsPageRoutingModule } from './ajouter-livraison-produits-routing.module';

import { AjouterLivraisonProduitsPage } from './ajouter-livraison-produits.page';
import { RouterModule } from '@angular/router';
import { AjouterBonLivraisonPage } from '../ajouter-bon-livraison/ajouter-bon-livraison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AjouterLivraisonProduitsPageRoutingModule,RouterModule.forChild([
      {
        path: '',
        component: AjouterBonLivraisonPage
      }
    ]),
		IonicSelectableModule
  ],
  declarations: [AjouterLivraisonProduitsPage]
})
export class AjouterLivraisonProduitsPageModule {}
