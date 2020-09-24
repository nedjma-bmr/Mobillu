import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Facture } from 'src/app/models/facture.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ModalController } from '@ionic/angular';
import { ClientsService } from 'src/app/services/clients/clients.service';
import * as moment from 'moment';
import { ImporterBonLivraisonPage } from '../importer-bon-livraison/importer-bon-livraison.page';
import { FacturesService } from 'src/app/services/factures/factures.service';

@Component({
  selector: 'app-ajouter-facture',
  templateUrl: './ajouter-facture.page.html',
  styleUrls: ['./ajouter-facture.page.scss'],
})
export class AjouterFacturePage implements OnInit {

@Input () facture : Facture []

  myDate: String = new Date().toISOString();
  clients : Client[];
  clientFacture = new Client();
  factureModel = new Facture ()
    isSelected : boolean = false ;
    numFact  ; 

    @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;

  constructor(private modalCrtl:ModalController, 
    private _clientService : ClientsService,
    private _factureService : FacturesService) { }

  ngOnInit() {

    
    /**
     * afficher la liste des clients pr choisir  
     */
    this._clientService.getAll().subscribe(client=>{
      this.clients=client;
     
    });

    /** 
     * recuperer le nouveau num de facture 
     */
this._factureService.getNumBon().subscribe(num=>{
  this.numFact = num 
  
})
     
  }


  /**
 * pour masquer le label de choix du client une fois séléctionné 
 */
change(){
  this.isSelected= true ; 
}


/**
 * 
 * @param id interface pr choisir le bon de commande à importer 
 */

async importerBonLivraison( id : string ){
  this.factureModel.design_client = this.clientFacture.design_client;
  this.factureModel.id_client = id ; 
  this.factureModel.num_Fact= this.numFact
  this.factureModel.date_Fact = this.myDate.toString(); 
  this.factureModel.date_Fact = moment(this.factureModel.date_Fact).format('YYYY-MM-DD');

this.modalCrtl
.create({
  component:ImporterBonLivraisonPage,
  componentProps: {'idClientImporter' : id ,
   'InfoFacture': this.factureModel , 'facture' : this.facture }, 
swipeToClose: true , 


})
.then(modal => {
  modal.present();
  return modal.onDidDismiss();
})

}

  /**
 * fermer la page ajouterBonFacture 
 */
closeModal(){
  this.modalCrtl.dismiss('close');
}
}
