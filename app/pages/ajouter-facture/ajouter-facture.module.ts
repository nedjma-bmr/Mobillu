import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterFacturePageRoutingModule } from './ajouter-facture-routing.module';

import { AjouterFacturePage } from './ajouter-facture.page';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { FacturesPage } from '../factures/factures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterFacturePageRoutingModule ,
    RouterModule.forChild([
      {
        path: '',
        component: FacturesPage
      }
    ]),
		IonicSelectableModule
  ],
  declarations: [AjouterFacturePage]
})
export class AjouterFacturePageModule {}
