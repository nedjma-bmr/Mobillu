import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DevisProduits } from 'src/app/models/devis-produits.model';
import { Livraison } from 'src/app/models/livraison.model';
import { LivraisonsService } from 'src/app/services/livraisons/livraisons.service';
import { LivraisonProduitsService } from 'src/app/services/livraison-produits/livraison-produits.service';
import { LivraisonProduits } from 'src/app/models/livraison-produits.model';
import { ToastController } from '@ionic/angular';
import { CommandProduits } from 'src/app/models/commande-produit.model';
@Component({
  selector: 'app-commande-produits-importer',
  templateUrl: './commande-produits-importer.page.html',
  styleUrls: ['./commande-produits-importer.page.scss'],
})
export class CommandeProduitsImporterPage implements OnInit {

@Input () commandeProduit: CommandProduits[]

@Input () InfoBonLivImporter : Livraison

@Input ()  idCommandeImporter: number ; 
livraisonModel = new Livraison ()

ProduitsLivrer : LivraisonProduits [] = []


  constructor( private modalCrtl: ModalController,
   private  _livraisonService: LivraisonsService,
   private _livraisonProduitsService : LivraisonProduitsService ,
   public toast: ToastController) { }

  ngOnInit() {
    
   
    this.commandeProduit.forEach(prod=>{
      
      prod.prixttc = Number(prod.pvht) + (Number(prod.pvht) * (Number(prod.TVA)/100));
      prod.prixttc = Number (prod.prixttc.toFixed(2))
      prod.puht = Number((prod.prixttc * prod.qte).toFixed(2)); 
     prod.total = Number (prod.puht) * (1- (Number (prod.remise/100)));
     prod.total = Number (prod.total.toFixed(2));
     
    const prodLiv = new LivraisonProduits() 
      
       prodLiv.id_prod = prod.id_prod;
       prodLiv.puht = prod.puht;
       prodLiv.qte = prod.qte ; 
       prodLiv.remise = prod.remise
     
      this.ProduitsLivrer.push(prodLiv)

     console.log(this.ProduitsLivrer)
     
    })
    
  }


/**
 * fermer la page commandeProduitsImporter
 */
dismissModal(){
  this.modalCrtl.dismiss('close');
}


ValiderBonLivraison(){

  this.InfoBonLivImporter.num_bonCmd = this.idCommandeImporter;
 
  this._livraisonService.create(this.InfoBonLivImporter).subscribe(async idBonLivraison  =>{
   
    this.livraisonModel.id_bonLiv = idBonLivraison.toString();
   
    
    
    this.ProduitsLivrer.forEach(prodLivrer=>{
      prodLivrer.id_bonLiv= idBonLivraison.toString() ;

  })

    
    this._livraisonProduitsService.add(this.ProduitsLivrer ).subscribe()
   this.modalCrtl.dismiss(this.InfoBonLivImporter ); 
    

   this.toast.create({
      message: 'Bon de livraison créé avc succés',
      duration: 2000
    }).then((toastData) => {
     
      toastData.present();
    });
    
    }); 
}

}
