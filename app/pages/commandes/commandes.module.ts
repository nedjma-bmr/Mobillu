import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandesPageRoutingModule } from './commandes-routing.module';

import { CommandesPage } from './commandes.page';
import { AjoutCommandPage } from '../ajout-command/ajout-command/ajout-command.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { ModifiercommandePage } from '../modifiercommande/modifiercommande.page';
import { ImporterDevisPage } from '../importer-devis/importer-devis.page';
import { ProduitsImporterPage } from '../produits-importer/produits-importer.page';
import { ProduitsCmdPage } from '../produits-cmd/produits-cmd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandesPageRoutingModule ,
    IonicSelectableModule
   ],
  declarations: [CommandesPage,AjoutCommandPage,ModifiercommandePage,ImporterDevisPage,ProduitsImporterPage,ProduitsCmdPage],
  entryComponents:[AjoutCommandPage,ModifiercommandePage,ImporterDevisPage,ProduitsImporterPage,ProduitsCmdPage]
})
export class CommandesPageModule {}
