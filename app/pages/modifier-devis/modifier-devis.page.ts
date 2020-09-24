import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Devis } from 'src/app/models/devis.model';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { Client } from 'src/app/models/client.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import { DevisService } from 'src/app/services/devis/devis.service';
import { ProduitsDevisPage } from '../produits-devis/produits-devis.page';
import { DevisProduits } from 'src/app/models/devis-produits.model';
import { DevisProduitsService } from 'src/app/services/devis-produits/devis-produits.service';

@Component({
  selector: 'app-modifier-devis',
  templateUrl: './modifier-devis.page.html',
  styleUrls: ['./modifier-devis.page.scss'],
})
export class ModifierDevisPage implements OnInit {
@Input () devis : Devis
@Input () devisProduits : DevisProduits []
devisModel = new Devis() ; 
clients : Client []
ClientModifier = new Client()
devisProd : DevisProduits []
ModifierProduit =false ; 
@ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  constructor(
    private modalCtrl: ModalController,
    private _clientService: ClientsService , 
    private _devisService : DevisService , 
    private modalCrtl: ModalController , 
    private _devisProduitsService : DevisProduitsService
  ) { }

  ngOnInit() {
    this.devisModel = this.devis ; 

    this._clientService.getAll().subscribe(client=>{
      this.clients=client;
    
    
     // let r = Math.random().toString(36).substring(7);
//    console.log("random", r);
    
    }); 


  }

 
  /**
     * fermer la modal
     */
    dismissModal(){
      this.modalCtrl.dismiss();
    }

    onSubmit(){
      // this.devisModel.id_client = this.ClientModifier.id
      this._devisService.update(this.devisModel , this.devis.id_proforma).subscribe(()=>
      {
         
        this.modalCrtl.dismiss(this.devisModel,'updated');
        
      });
      
    }
  

    ModifierProduitsDevis(id){
    const     ModifierProduit= true ; 
     this._devisProduitsService.get(id).subscribe(list=>{
       this.devisProd = list ; 
 
     
      this.modalCtrl.create({
        component: ProduitsDevisPage,
        componentProps: {'devisProduits' : this.devisProd , 'ModifierProd' : ModifierProduit , 'idDevis': id }, 
      
      })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
    })
    }


    changeDesignClient(idclient : string){
      var client = this.clients.find(elem => elem.id == idclient)
      this.devisModel.design_client = client.design_client;
    }
}
