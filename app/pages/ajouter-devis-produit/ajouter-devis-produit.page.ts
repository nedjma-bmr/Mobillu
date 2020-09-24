import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, AlertController, IonInput } from '@ionic/angular';
import { famille } from 'src/app/models/famille.model';
import { FamilleService } from 'src/app/services/familles/famille.service';
import { produit } from 'src/app/models/produit.model';
import { ProduitsService } from 'src/app/services/produits/produits.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { DevisProduits } from 'src/app/models/devis-produits.model';
import { Devis } from 'src/app/models/devis.model';
import { Pipe, PipeTransform } from '@angular/core';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-ajouter-devis-produit',
  templateUrl: './ajouter-devis-produit.page.html',
  styleUrls: ['./ajouter-devis-produit.page.scss'],
})

@Pipe({
  name: 'removeComma'
})



export class AjouterDevisProduitPage implements OnInit {

Produit : produit[];
produitModel = new produit();
newDevisProduit = new DevisProduits();
qteProduit = 1;
ProduitAfficher = new produit();
  familles: famille[];
  familleModel = new famille();

  checked=false ; 
  remise   ; 
   
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  @ViewChild('remise') remiseElement: IonInput;
  
  
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

    this.ProduitAfficher.id_prod= undefined
    this.ProduitAfficher.design_prod= undefined
   
   this._produitService.get(id).subscribe(produit=>{
    this.Produit= produit;

   
  
  })  
}
 
afficherProduit(){
 
  this.newDevisProduit.TVA = ( (this.ProduitAfficher.TVA / 100 )) * (this.ProduitAfficher.pvht)  
  this.newDevisProduit.TVA = Number (this.newDevisProduit.TVA.toFixed(2))
  this.newDevisProduit.prixttc= Number (this.ProduitAfficher.pvht) + Number (this.newDevisProduit.TVA)
  this.newDevisProduit.puht = this.newDevisProduit.prixttc;
}

increase(){
  
  
  this.qteProduit++;
 
 
  this.newDevisProduit.puht = this.newDevisProduit.prixttc * this.qteProduit;

}

decrease(){


  this.qteProduit--;
  if (this.qteProduit< 1 )
  this.qteProduit= 1 
 
  this.newDevisProduit.puht = this.newDevisProduit.prixttc * this.qteProduit;

}


 


/**
 * fermer la modal 
 */
  
closeModal(){
  this.modalCrtl.dismiss( 'fermé');
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
    
    this.newDevisProduit.TVA = this.ProduitAfficher.TVA
    this.newDevisProduit.id_prod = this.ProduitAfficher.id_prod;
    this.newDevisProduit.design_prod = this.ProduitAfficher.design_prod;
    this.newDevisProduit.code_prod = this.ProduitAfficher.code_prod;
    this.newDevisProduit.qte = this.qteProduit;
    this.newDevisProduit.pvht = this.ProduitAfficher.pvht
    this.qteProduit = 1;
   
    if (!this.checked ){
      this.newDevisProduit.remise= 0
    }
    
    

     this.modalCrtl.dismiss(this.newDevisProduit);
     
    
  }
    
    
    }
  /*mettre le focus sur le champ de saisie de remise*/
  remiseFocus(){
    this.remiseElement.setFocus();
  }
 
}

