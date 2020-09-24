import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import * as moment from 'moment'
import { Devis } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/services/devis/devis.service';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { Client } from 'src/app/models/client.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProduitsService } from 'src/app/services/produits/produits.service';
import { AjouterDevisProduitPage } from '../ajouter-devis-produit/ajouter-devis-produit.page';
import { DevisProduits } from 'src/app/models/devis-produits.model';
import { $ } from 'protractor';
import { DevisProduitsService } from 'src/app/services/devis-produits/devis-produits.service';
import { produit } from 'src/app/models/produit.model';


@Component({
  selector: 'app-ajouter-devis',
  templateUrl: './ajouter-devis.page.html',
  styleUrls: ['./ajouter-devis.page.scss'],
})
export class AjouterDevisPage implements OnInit {
  
  
  defaultDate = "1987-06-30";
  isSubmitted = false;
  numBonDevis ; 
  devisModel = new Devis();
  devis: Devis[];
  clients : Client[];
  clientModel = new Client();
  clientDevis = new Client();
  devisProdModel = new DevisProduits();
  receivedDevisProduit=new Array<DevisProduits>();
  Enregister = false ; 
 
    @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  
  constructor(private modalCrtl:ModalController ,
     public formBuilder: FormBuilder,
    private _devisService : DevisService,
    private _clientService: ClientsService, 
    private _devisProduitService : DevisProduitsService ,
    private alertCtrl: AlertController
   ) { }

   
  ngOnInit() : void {
    /**
     * afficher la liste des clients pr choisir  
     */
    this._clientService.getAll().subscribe(client=>{
      this.clients=client;
     
    
     // let r = Math.random().toString(36).substring(7);
//    console.log("random", r);
    
    }); 
/**
 * recuperer le num de bon de devis 
 */
    this._devisService.getNumBon().subscribe(id=>{
      this.numBonDevis = id ; 
    })
  
  }
  
  
 
/**
 * enregister le client et les produits ajoutés dans le devis dans la bdd 
 */
   async submitForm() {
    
     //Ajouter client au devis
     
       // this.devisModel.num_proforma = Math.floor(Math.random() * 5);
   
     this.devisModel.id_client = this.clientDevis.id;
     this.devisModel.num_proforma= this.numBonDevis
     if (this.devisModel.id_client  == undefined ) {
      let prompt = this.alertCtrl.create({
        message: 'Veuillez séléctionner un client',
        buttons: [
          {
            text: 'OK',
            handler: data => {
             
            }
          }
        ]
      });
      (await prompt).present();
     } else { 
      if (this.receivedDevisProduit.length== 0 ) { 
        let prompt = this.alertCtrl.create({
          message: 'Veuillez choisir au moins un produit',
          buttons: [
            {
              text: 'OK',
              handler: data => {
                
              }
            }
          ]
        });
        (await prompt).present();
       
         
       } else { 
     this.devisModel.design_client = this.clientDevis.design_client;
     this.devisModel.date_proforma = moment(this.devisModel.date_proforma).format('YYYY-MM-DD');
    this._devisService.create(this.devisModel).subscribe(async idDevis  =>{
      this.devisModel.id_proforma = idDevis.toString();
      this.modalCrtl.dismiss(this.devisModel ); 
     
      this.receivedDevisProduit.forEach( elem =>  elem.id_devis = idDevis.toString() )
      
      this._devisProduitService.add(this.receivedDevisProduit).subscribe();
     
     
      
     });
     
  }
}
} 
    
   

   

    
   /**
    * permet d'ouvrir la page d'ajout d'un produit et le récupérer une fois ajouté 
    * pr l'afficher dans la liste 
    */
  
  async AjouterProduit(){
   
    
      const modal = await this.modalCrtl.create({
    component: AjouterDevisProduitPage, 
    
    
    swipeToClose: true , 
    
  });

  modal.onDidDismiss().then(dataReturned=>{
    if (dataReturned.data !== 'fermé'){
    this.receivedDevisProduit.push(dataReturned.data);
    }
  })
  return  await modal.present();
  }

/**
 * fermer la page ajouterDevis  
 */
 closeModal(){
   this.modalCrtl.dismiss('close');
 }

 
}
