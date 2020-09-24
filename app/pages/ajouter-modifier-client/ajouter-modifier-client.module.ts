import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterModifierClientPageRoutingModule } from './ajouter-modifier-client-routing.module';

import { AjouterModifierClientPage } from './ajouter-modifier-client.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AjouterModifierClientPageRoutingModule
  ],
  declarations: [AjouterModifierClientPage]
})
export class AjouterModifierClientPageModule {}
