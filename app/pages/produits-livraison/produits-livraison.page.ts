import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LivraisonProduits } from 'src/app/models/livraison-produits.model';

@Component({
  selector: 'app-produits-livraison',
  templateUrl: './produits-livraison.page.html',
  styleUrls: ['./produits-livraison.page.scss'],
})
export class ProduitsLivraisonPage implements OnInit {

  @Input() livraisonProduits : LivraisonProduits[]

  constructor( private modalCtrl:ModalController) { }

  ngOnInit() {

    this.livraisonProduits.forEach(prod=>{
      
      prod.prixttc = Number (prod.pvht) + Number (prod.TVA/100 * prod.pvht); 
       
      prod.puht =prod.prixttc * prod.qte ; 
    })

   
  }


  /**
 * Fermer la page 
 */
closeModal (){
  this.modalCtrl.dismiss('Fermer'); 
}
}
