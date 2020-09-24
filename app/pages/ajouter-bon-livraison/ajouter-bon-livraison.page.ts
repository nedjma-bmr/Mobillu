import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { Client } from 'src/app/models/client.model';
import { NouveauBonLivraisonPage } from '../nouveau-bon-livraison/nouveau-bon-livraison.page';
import { Livraison } from 'src/app/models/livraison.model';
import * as moment from 'moment';
import { ImporterBonCommandePage } from '../importer-bon-commande/importer-bon-commande.page';
import { DevisService } from 'src/app/services/devis/devis.service';
import { Devis } from 'src/app/models/devis.model';
import { LivraisonsService } from 'src/app/services/livraisons/livraisons.service';
import { cpuUsage } from 'process';
import { LivraisonProduitsService } from 'src/app/services/livraison-produits/livraison-produits.service';

@Component({
  selector: 'app-ajouter-bon-livraison',
  templateUrl: './ajouter-bon-livraison.page.html',
  styleUrls: ['./ajouter-bon-livraison.page.scss'],
})
export class AjouterBonLivraisonPage implements OnInit {

  myDate: String = new Date().toISOString();
  clients : Client[];
  clientLivraison = new Client();
  livraisonModel = new Livraison ()
    isSelected : boolean = false ;
     numBonLiv ; 
   @ Input () livraison : Livraison []
      
 @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  constructor(private modalCrtl:ModalController, 
    private _clientService : ClientsService,
    private alertController: AlertController,
    private _livraisonService: LivraisonsService
   
    
   ) { }
 
  ngOnInit() {

    /**
     * afficher la liste des clients pr choisir  
     */
    this._clientService.getAll().subscribe(client=>{
      this.clients=client;
     
    });
      
     
/**
 * recuperr le num de bon de livraison 
 * 
 */

 this._livraisonService.getNumBon().subscribe(id=>{
  this.numBonLiv=id;
  });
     // this.r = Math.random().toString(36).substring(7);
 //   this.r = Math.floor(Math.random()*20)+1;
  
}
/**
 * fermer la page ajouterBonLivraison 
 */
closeModal(){
  this.modalCrtl.dismiss('close');
}
/**
 * pour masquer le label de choix du client une fois séléctionné 
 */
change(){
  this.isSelected= true ; 
}
/**
 * Ouvrir la page Nouveau Bon de Livraison
 */
  
 async nouveauBonLivraison(idClient : string ){
   this.livraisonModel.valider="Oui"
this.livraisonModel.num_bonCmd= 0 ; 
 this.livraisonModel.design_client = this.clientLivraison.design_client
  this.livraisonModel.num_bonLiv= this.numBonLiv
  this.livraisonModel.id_client = idClient ; 
  this.livraisonModel.date_bonLiv = this.myDate.toString(); 
  this.livraisonModel.date_bonLiv = moment(this.livraisonModel.date_bonLiv).format('YYYY-MM-DD');
 
  this.modalCrtl
  .create({
    component:NouveauBonLivraisonPage,
    componentProps: {'nouveauBonLiv' : this.livraisonModel 
}, 
  swipeToClose: true , 
  
 
  })
  .then(modal => {
    modal.present();
    return modal.onDidDismiss();
  })
  .then(dataReturned=>{
    
    if(dataReturned.data!=='close'){
     this.livraison.push(dataReturned.data)
  
    }
  })
  this.closeModal()
  
  
}


/**
 * 
 * @param id interface pr choisir le bon de commande à importer 
 */

  async importerBonCommande( id : string ){
  
    this.livraisonModel.id_client = id ; 
    this.livraisonModel.num_bonLiv= this.numBonLiv
   
   
    this.livraisonModel.date_bonLiv = this.myDate.toString(); 
    this.livraisonModel.date_bonLiv = moment(this.livraisonModel.date_bonLiv).format('YYYY-MM-DD');
  
  this.modalCrtl
  .create({
    component:ImporterBonCommandePage,
    componentProps: {'idClientImporter' : id ,
     'InfoBonLivraison': this.livraisonModel , 'livraison' : this.livraison}, 
  swipeToClose: true , 
 
  })
  .then(modal => {
    modal.present();
    return modal.onDidDismiss();
  })

}
}
