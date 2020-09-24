import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutProduitPageRoutingModule } from './ajout-produit-routing.module';

import { AjoutProduitPage } from './ajout-produit.page';
import { AjoutCommandPageModule } from '../../ajout-command/ajout-command/ajout-command.module';
import { AjoutCommandPage } from '../../ajout-command/ajout-command/ajout-command.page';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutProduitPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: AjoutCommandPage
      }
    ]),
		IonicSelectableModule
  ],
  declarations: [AjoutProduitPage]
})
export class AjoutProduitPageModule {}
