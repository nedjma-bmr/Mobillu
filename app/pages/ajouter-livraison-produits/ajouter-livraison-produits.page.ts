import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ModalController, AlertController } from '@ionic/angular';
import { FamilleService } from 'src/app/services/familles/famille.service';
import { ProduitsService } from 'src/app/services/produits/produits.service';
import { produit } from 'src/app/models/produit.model';
import { famille } from 'src/app/models/famille.model';
import { LivraisonProduits } from 'src/app/models/livraison-produits.model';

@Component({
  selector: 'app-ajouter-livraison-produits',
  templateUrl: './ajouter-livraison-produits.page.html',
  styleUrls: ['./ajouter-livraison-produits.page.scss'],
})
export class AjouterLivraisonProduitsPage implements OnInit {



  Produit : produit[];
  familles: famille[];
  newLivraisonProduit = new LivraisonProduits();
  ProduitAfficher = new produit();
  qteProduit = 1;
  familleModel = new famille();
  produitModel = new produit();

  checked=false ; 
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;

  constructor(private modalCrtl: ModalController, 
    private _familleService : FamilleService,
    private _produitService : ProduitsService , 
    private alertController: AlertController ) { }


  ngOnInit() {


     /**
     * afficher la liste des familles 
     */
    this._familleService.getAll().subscribe(familles=>{
      this.familles= familles;
      
    })
      
  }
/**
 * 
 * @param event afficher la liste des produits d'une famille selon son id 
 */
  SelectedFamille(event){
    let id= event.target.value
   
   this._produitService.get(id).subscribe(produit=>{
    this.Produit= produit;



   
  
  })  
  }

/**
 * lancer à l'affichage du produit séléctionné 
 */

  afficherProduit(){
 
    this.newLivraisonProduit.TVA = ( (this.ProduitAfficher.TVA / 100 )) * (this.ProduitAfficher.pvht)  
    this.newLivraisonProduit.prixttc= Number (this.ProduitAfficher.pvht) + Number (this.newLivraisonProduit.TVA)
    this.newLivraisonProduit.puht = this.newLivraisonProduit.prixttc;
  }



  increase(){
  
  
    this.qteProduit++;
   
   
    this.newLivraisonProduit.puht = this.newLivraisonProduit.prixttc * this.qteProduit;
  
  }
  
  decrease(){
  
  
    this.qteProduit--;
   
    this.newLivraisonProduit.puht = this.newLivraisonProduit.prixttc * this.qteProduit;
  
  }
  


   /**
   * enregistrere les produits ajoutés 
   */
  async Register(){
      
      
    if(this.ProduitAfficher.id_prod == undefined) {
      let alert = this.alertController.create({
        
        message: 'Veuillez d abord choisir un produit',
        buttons: ['Annuler', 'OK']
      });

      (await alert).present();
    } else {
    
   
    this.newLivraisonProduit.id_prod = this.ProduitAfficher.id_prod;
    this.newLivraisonProduit.design_prod = this.ProduitAfficher.design_prod;
    this.newLivraisonProduit.code_prod = this.ProduitAfficher.code_prod;
    this.newLivraisonProduit.qte = this.qteProduit;
    this.newLivraisonProduit.pvht = this.ProduitAfficher.pvht
    this.qteProduit = 1;
   
    if (!this.checked ){
      this.newLivraisonProduit.remise= 0
    }
    
    

     this.modalCrtl.dismiss(this.newLivraisonProduit);
     
    
  }
}
  /**
 * fermer la modal 
 */
  
closeModal(){
  this.modalCrtl.dismiss( 'fermé');
}

}
