import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitsCmdPageRoutingModule } from './produits-cmd-routing.module';

import { ProduitsCmdPage } from './produits-cmd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitsCmdPageRoutingModule
  ],
  declarations: [ProduitsCmdPage]
})
export class ProduitsCmdPageModule {}
