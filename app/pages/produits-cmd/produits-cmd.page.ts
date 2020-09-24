import { Component, OnInit, Input } from '@angular/core';
import { CommandProduits } from 'src/app/models/commande-produit.model';
import { ModalController } from '@ionic/angular';
import { produit } from 'src/app/models/produit.model';
import { CommandesProduitsService } from 'src/app/services/commandes_produits/commandes-produits.service';
import { AjoutProduitPage } from '../ajout-produit/ajout-produit/ajout-produit.page';

@Component({
  selector: 'app-produits-cmd',
  templateUrl: './produits-cmd.page.html',
  styleUrls: ['./produits-cmd.page.scss'],
})
export class ProduitsCmdPage implements OnInit {
  @Input() public cmdProds:CommandProduits[];
  @Input () ModifierProd : boolean
  @Input() numCmd:number;
  edited = false;
  Modifier = false ;
  CmdProdModel = new CommandProduits();
  CmdProdAjout = new  Array<CommandProduits>();
  
  constructor(private modalCtrl:ModalController,
    private cmdProdSer:CommandesProduitsService) { }

  ngOnInit() {
    for(let cmdp of this.cmdProds){
      cmdp.prixttc= Number (cmdp.pvht) + Number (cmdp.TVA/100 * cmdp.pvht); 
    }
    this.Modifier= this.ModifierProd;
  }

/**
  * mettre à jour le produit modifié dans la bdd 
  */
 Submit(){
    
  var produitsModifie = this.cmdProds.filter(cmdp => cmdp.estModifie === true);
  console.log(produitsModifie);
  this.cmdProdSer.update(produitsModifie).subscribe(data => console.log(data));


    for(let c of this.cmdProds){
      c.Num_cmd=this.numCmd;
      this.cmdProdSer.create(c).subscribe((c)=>{
 console.log(c);
      });
    }
    this.modalCtrl.dismiss(this.CmdProdAjout);

 
  
}



/**
 * 
 * @param product incrémenter la quantité d'un produit
 */
increase(product: CommandProduits){
  this.edited = true;
  product.estModifie = true;
  product.qte++;
  product.puht = product.prixttc * product.qte ; 

   
}
/**
* 
* @param product décrementer la quantité d'un produit 
*/
decrease(product : CommandProduits ){
this.edited = true;
product.estModifie = true;
product.qte--;
product.puht = product.prixttc * product.qte ; 


}

// Ouvrir la page pour ajouter un produit
  async ajouterProduit(){
    
    const modal = await this.modalCtrl.create({
      component: AjoutProduitPage,
      swipeToClose: true , 
    
    
    });
    modal.onDidDismiss().then(dataReturned=>{
      if (dataReturned.data !== 'fermé'){
        this.CmdProdAjout.push(dataReturned.data)
      
      //Mettre a jour la liste des produits du devis  
      this.cmdProds.push(dataReturned.data);
     
       this.edited=true;
      }
    })
    return  await modal.present();
    }
  
  /**
   * fermer la page 
   */
  dismissModal(){

    this.modalCtrl.dismiss() ;
    
    
  }

}
