import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevisPageRoutingModule } from './devis-routing.module';        
                                                         
import { DevisPage } from './devis.page';            
import { AjouterDevisPage } from '../ajouter-devis/ajouter-devis.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { AjouterDevisProduitPage } from '../ajouter-devis-produit/ajouter-devis-produit.page';
                                                       
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevisPageRoutingModule,
    IonicSelectableModule
  ],
  declarations:[DevisPage,AjouterDevisPage,AjouterDevisProduitPage],
  entryComponents:[AjouterDevisPage,AjouterDevisProduitPage]
})
export class DevisPageModule {}
 
 
 
  