import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterBonLivraisonPageRoutingModule } from './ajouter-bon-livraison-routing.module';
import { RouterModule } from '@angular/router';
import { AjouterBonLivraisonPage } from './ajouter-bon-livraison.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { LivraisonPage } from '../livraison/livraison.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AjouterBonLivraisonPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: LivraisonPage
      }
    ]),
		IonicSelectableModule
  ],
  declarations: [AjouterBonLivraisonPage]
})
export class AjouterBonLivraisonPageModule {}
