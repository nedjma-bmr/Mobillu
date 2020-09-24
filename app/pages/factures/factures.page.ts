import { Component, OnInit } from '@angular/core';
import { Facture } from 'src/app/models/facture.model';
import { Client } from 'src/app/models/client.model';

import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { FacturesService } from 'src/app/services/factures/factures.service';

import { AjouterFacturePage } from '../ajouter-facture/ajouter-facture.page';
import { DetailFacturePage } from '../detail-facture/detail-facture.page';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.page.html',
  styleUrls: ['./factures.page.scss'],
})
export class FacturesPage implements OnInit {
  facture : Facture [] ; 
  clients : Client[];
  clientModel = new Client();
  FactureModel = new Facture();


  constructor( private _factureService :FacturesService,
    private modalCtrl: ModalController, 
    private routerOutlet : IonRouterOutlet) { }

  ngOnInit() {

    /**
  * afficher la liste des factures
  */
 this._factureService.getAll().subscribe(data=>{
  this.facture= data
  
 })

 
  }


  /**
 * permet d'afficher la page d'ajout d'un bon de livraison 
 */
ajouterBonFacture(){

  //this.num=(this.livraison[(this.livraison.length)-1].num_bonLiv)++;
  
  this.modalCtrl
  .create({
    component:AjouterFacturePage,
    cssClass: 'modal-livraison',
    componentProps: {'facture' : this.facture},
   
  swipeToClose: true , 
  
  presentingElement: this.routerOutlet.nativeEl
  })
  .then(modal => {
    modal.present();
    return modal.onDidDismiss();
  })
  
 
    
}

/**
 * detai facture 
 */

async detailFacture( id: string ){
  var FactureAfficherData = this.facture.find( elem => elem.id_Fact == id)
  const modal = await this.modalCtrl.create({
    component: DetailFacturePage, 
    componentProps: {'FactureAfficher' : FactureAfficherData },
    cssClass: 'my-modal',
    swipeToClose: true , 
    presentingElement: this.routerOutlet.nativeEl
  });
  
  return  await modal.present();

}
 
}
