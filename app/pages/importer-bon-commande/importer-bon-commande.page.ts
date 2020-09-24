import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Devis } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/services/devis/devis.service';
import { Livraison } from 'src/app/models/livraison.model';
import { DevisProduitsService } from 'src/app/services/devis-produits/devis-produits.service';
import { DevisProduits } from 'src/app/models/devis-produits.model';
import { collectExternalReferences } from '@angular/compiler';
import { CommandeProduitsImporterPage } from '../commande-produits-importer/commande-produits-importer.page';
import { CommandesService } from 'src/app/services/commandes/commandes.service';
import { commande } from 'src/app/models/commande.model';
import { CommandesProduitsService } from 'src/app/services/commandes_produits/commandes-produits.service';
import { CommandProduits } from 'src/app/models/commande-produit.model';
import { LivraisonsService } from 'src/app/services/livraisons/livraisons.service';

@Component({
  selector: 'app-importer-bon-commande',
  templateUrl: './importer-bon-commande.page.html',
  styleUrls: ['./importer-bon-commande.page.scss'],
})
export class ImporterBonCommandePage implements OnInit {
  @Input() idClientImporter: string; 
  @Input () InfoBonLivraison : Livraison
  @Input () livraison : Livraison []
  CommandesImporter : commande []
  
  commandesProduitsImporter : CommandProduits []
   
  select = false ;
  idCommande ;
   
  constructor( private modalCrtl: ModalController,
    
    private _commandesService : CommandesService , 
    private _commandesProduits : CommandesProduitsService , 
    private _livraisonService : LivraisonsService
    ) { }

   
  ngOnInit() {
    
     /**
     * afficher la liste des commandes pour choisir celui à importer 
     */
    this._commandesService.getListCmdByClientId(this.idClientImporter).subscribe(ListDevis=>
      { this.CommandesImporter= ListDevis ; 
        
      }
     )
     
     
  }



/**
 * 
 * @param id Séléctioner un bon de commande à importer 
 */
 SelectioncommandeImporter(id: string) {
    
  this.select= true ; 
  this.CommandesImporter.forEach(r=>{

    r.value = false ; 
  })
 this.idCommande= id ; 
  


 }



 /**
 * fermer la page commandeProduitsImporter
 */
dismissModal(){
  this.modalCrtl.dismiss('close');
}


/**
 * Afficher les produits du bon de commande choisit dans la page commandeProduitsImporter
 */
 afficherProduitsCommande(){
  
  this._commandesProduits.get(this.idCommande).subscribe(data=>{
    this.commandesProduitsImporter= data; 
    
    
    this.modalCrtl
  .create({
    component:CommandeProduitsImporterPage,
    componentProps: {'commandeProduit' : this.commandesProduitsImporter , 
    'InfoBonLivImporter' : this.InfoBonLivraison , 'idCommandeImporter' : this.idCommande }, 
  
  swipeToClose: true , 
  
 
  })
  
  .then(modal => {
    modal.present();
    return modal.onDidDismiss();
  }).then(dataReturned=>{
    if(dataReturned.data!=='close'){
      this.livraison.push(dataReturned.data)
      
    } else {
      console.log(dataReturned)
    }
    
  })
  this.dismissModal()
  })
 
  
  
 }
}
