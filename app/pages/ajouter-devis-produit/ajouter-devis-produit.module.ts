import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';

import { AjouterDevisProduitPageRoutingModule } from './ajouter-devis-produit-routing.module';

import { AjouterDevisProduitPage } from './ajouter-devis-produit.page';
import { RouterModule } from '@angular/router';
import { AjouterDevisPage } from '../ajouter-devis/ajouter-devis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AjouterDevisProduitPageRoutingModule,RouterModule.forChild([
      {
        path: '',
        component: AjouterDevisPage
      }
    ]),
		IonicSelectableModule
  ],
  declarations: [AjouterDevisProduitPage]
})
export class AjouterDevisProduitPageModule {}
