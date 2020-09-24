import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterDevisPageRoutingModule } from './ajouter-devis-routing.module';

import { AjouterDevisPage } from './ajouter-devis.page';
import { RouterModule } from '@angular/router';
import { DevisPage } from '../devis/devis.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AjouterDevisPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: DevisPage
      }
    ]),
		IonicSelectableModule
  ],
  declarations: [AjouterDevisPage],
 
})
export class AjouterDevisPageModule {}
