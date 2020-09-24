import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Livraison } from 'src/app/models/livraison.model';
import { LivraisonsService } from 'src/app/services/livraisons/livraisons.service';
import { LivraisonProduits } from 'src/app/models/livraison-produits.model';
import { AjouterLivraisonProduitsPage } from '../ajouter-livraison-produits/ajouter-livraison-produits.page';
import { LivraisonProduitsService } from 'src/app/services/livraison-produits/livraison-produits.service';

@Component({
  selector: 'app-nouveau-bon-livraison',
  templateUrl: './nouveau-bon-livraison.page.html',
  styleUrls: ['./nouveau-bon-livraison.page.scss'],
})
export class NouveauBonLivraisonPage implements OnInit {
 
  @Input() nouveauBonLiv: Livraison ; 
 
  receivedLivraisonProduit=new Array<LivraisonProduits>();
  constructor(private modalCrtl: ModalController,
    private  _livraisonService : LivraisonsService,
    private alertCtrl: AlertController , 
    private _livraisonProduitService : LivraisonProduitsService) { }

  ngOnInit() {
  
  }
  

  closeModal(){
    this.modalCrtl.dismiss('close');
  }


   /**
    * permet d'ouvrir la page d'ajout d'un produit et le récupérer une fois ajouté 
    * pr l'afficher dans la liste 
    */
  
   async AjouterProduit(){
   
    
    const modal = await this.modalCrtl.create({
  component:AjouterLivraisonProduitsPage, 
  
  
  swipeToClose: true , 
  
});

modal.onDidDismiss().then(dataReturned=>{
  if (dataReturned.data !== 'fermé'){
  this.receivedLivraisonProduit.push(dataReturned.data);
  }
})
return  await modal.present();
}




/**
 * enregister le bon de livraison dans la bdd 
 */
 async submitForm() {
    
  
  
    // this.devisModel.num_proforma = Math.floor(Math.random() * 5);

    
   if (this.receivedLivraisonProduit.length== 0 ) { 
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

     
    
      this._livraisonService.create(this.nouveauBonLiv).subscribe( idBonLiv=>
        
  {
    
    
   
       
  
   this.receivedLivraisonProduit.forEach( elem =>  elem.id_bonLiv = idBonLiv.toString() )
   
   this._livraisonProduitService.add(this.receivedLivraisonProduit).subscribe();
  
   this.modalCrtl.dismiss(this.nouveauBonLiv ); 
 
  
   
  });
  
}
}
 
}
