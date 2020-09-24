import { Component, OnInit } from '@angular/core';
import { LivraisonsService } from 'src/app/services/livraisons/livraisons.service';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { Livraison } from 'src/app/models/livraison.model';
import { Client } from 'src/app/models/client.model';
import { AjouterBonLivraisonPage } from '../ajouter-bon-livraison/ajouter-bon-livraison.page';
import { DetailBonLivraisonPage } from '../detail-bon-livraison/detail-bon-livraison.page';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.page.html',
  styleUrls: ['./livraison.page.scss'],
})
export class LivraisonPage implements OnInit {

  livraison : Livraison [];
  
  clients : Client[];
  clientModel = new Client();
  livraisonModel = new Livraison();
  valider = "Non" ; 
  Valider="Oui" ; 
  constructor( private _livraisonService : LivraisonsService,
    private modalCtrl: ModalController, 
    private routerOutlet : IonRouterOutlet

  ) { }

  ngOnInit() {

    /**
  * afficher la liste des livraisons 
  */
 this._livraisonService.getAll().subscribe(data=>{
  this.livraison=data;
  
  
}); 

// initier la valeur d valider pr voir si le bon est facturé ou pas encore 




  }


  /**
 * permet d'afficher la page d'ajout d'un bon de livraison 
 */
ajouterBonLivraison(){

 
  
  this.modalCtrl
  .create({
    component:AjouterBonLivraisonPage,
    cssClass: 'modal-livraison',
    componentProps: {'livraison' : this.livraison},
  swipeToClose: true , 
  
  presentingElement: this.routerOutlet.nativeEl
  })
  .then(modal => {
    modal.present();
    return modal.onDidDismiss();
  })
  
 
    
}
 
/**
 * Detail du bon de Livraison 
 */
  async detailLivraison( id: string ){

  var BonLivAfficherData = this.livraison.find( elem => elem.id_bonLiv == id)
  
  const modal = await this.modalCtrl.create({
    component: DetailBonLivraisonPage, 
    componentProps: {'BonLivAfficher' : BonLivAfficherData },
    cssClass: 'my-modal',
    swipeToClose: true , 
    presentingElement: this.routerOutlet.nativeEl
  });
  
  return  await modal.present();

}

 
   
 
}
