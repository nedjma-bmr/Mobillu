import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierDevisPageRoutingModule } from './modifier-devis-routing.module';

import { ModifierDevisPage } from './modifier-devis.page';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { DevisPage } from '../devis/devis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModifierDevisPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: DevisPage
      }
    ]),
		IonicSelectableModule
  ],
  declarations: [ModifierDevisPage]
})
export class ModifierDevisPageModule {}
