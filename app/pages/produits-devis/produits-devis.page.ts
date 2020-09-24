import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import {DevisProduits} from 'src/app/models/devis-produits.model'
import {DevisProduitsService} from 'src/app/services/devis-produits/devis-produits.service';
import { produit } from 'src/app/models/produit.model';
import { Devis } from 'src/app/models/devis.model';
import { $, Ptor } from 'protractor';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { ModifierDevisPage } from '../modifier-devis/modifier-devis.page';
import { AjouterDevisProduitPage } from '../ajouter-devis-produit/ajouter-devis-produit.page';
@Component({
  selector: 'app-produits-devis',
  templateUrl: './produits-devis.page.html',
  styleUrls: ['./produits-devis.page.scss'],
})
export class ProduitsDevisPage implements OnInit {

  @Input() devisProduits: DevisProduits[];
  @Input () ModifierProd : boolean
  @Input () idDevis ;
Modifier = false ; 
  devisProd : DevisProduits[];
  produits : produit[] ;
  devisProdModel = new DevisProduits();
  edited = false;
  
 devisProdAjout = new  Array<DevisProduits>();
  constructor(private modalCtrl:ModalController,
    private  _devisProduitsService: DevisProduitsService,
    private alertCtrl: AlertController ) { 
     
    }

  ngOnInit() {  
    /** 
     * 
     * pr quaque produits dans un devis lui initier son prix ttc et puht 
     */
    
     this.devisProduits.forEach(prod=>{
       prod.prixttc = Number (prod.pvht) + Number (prod.TVA/100 * prod.pvht); 
        
       prod.puht =prod.prixttc * prod.qte ; 
     })

     this.Modifier= this.ModifierProd
     
  }
/**
 * 
 * @param product incrémenter la quantité d'un produit
 */
  increase(product: DevisProduits){
        this.edited = true;
        product.estModifie = true;
        product.qte++;
        product.puht = product.prixttc * product.qte ; 
        
       
  }
  /**
   * 
   * @param product décrementer la quantité d'un produit 
   */
  decrease(product : DevisProduits){
    this.edited = true;
    product.estModifie = true;
    product.qte--;
    product.puht = product.prixttc * product.qte ; 
    
  
  }
 /**
  * mettre à jour le produit modifié dans la bdd 
  */
  Submit(){
    
    var produitsModifie = this.devisProduits.filter(elem => elem.estModifie == true);
    
    this._devisProduitsService.update(produitsModifie).subscribe(data => console.log(data));

    this.modalCtrl.dismiss(produitsModifie);

    this.devisProdAjout.forEach(prod=>
      prod.id_devis= this.idDevis);
      this._devisProduitsService.add(this.devisProdAjout).subscribe()
      this.modalCtrl.dismiss(this.devisProdAjout);

   
    
  }


 

  

   
   /* async ajouterProduit(){
    let prompt = this.alertCtrl.create({
    
      message: 'Entrer les détails du produit',
      inputs: [
        {
          name: 'name',
          placeholder: 'Code Produit'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          type: 'number'
        },
        
        {
          name: 'price',
          placeholder: 'Prix',
          
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked')
          }
        },{
          text: 'Enregister',
          handler: data =>{
            this.devisProduits.push(data
              
              
            );
          }
        } 
        
      ]
    });
    (await prompt).present();
  }
  */

/**
 * rediriger vers la page d'ajout d'un produiit pr le devis 
 */
  async ajouterProduit(){
    
    const modal = await this.modalCtrl.create({
      component: AjouterDevisProduitPage,
      swipeToClose: true , 
    
    
    });
    modal.onDidDismiss().then(dataReturned=>{
      if (dataReturned.data !== 'fermé'){
        this.devisProdAjout.push(dataReturned.data)
      
      //Mettre a jour la liste des profduits du devis  
      this.devisProduits.push(dataReturned.data);
      this.edited = true;
    
      }
    })
    return  await modal.present();
    }
  
  

  /**
   * fermer la page 
   */
  dismissModal(){

    this.modalCtrl.dismiss(this.devisProduits , 'close') ;
    
    
  }

}

