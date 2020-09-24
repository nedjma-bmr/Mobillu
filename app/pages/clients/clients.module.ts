import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ClientsPage } from './clients.page';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   RouterModule.forChild([
     {
       path:'',
       component:ClientsPage
     }
   ])
  ],
  declarations: [ClientsPage ]
  
})
export class ClientsPageModule {}
