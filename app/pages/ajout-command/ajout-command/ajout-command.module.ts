import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutCommandPageRoutingModule } from './ajout-command-routing.module';

import { AjoutCommandPage } from './ajout-command.page';
import { RouterModule } from '@angular/router';
import { CommandesPage } from '../../commandes/commandes.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutCommandPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: CommandesPage
      }
    ]),
		IonicSelectableModule
  ],

  declarations: [AjoutCommandPage]
})
export class AjoutCommandPageModule {}
