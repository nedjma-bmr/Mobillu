import { Component, OnInit , Input} from '@angular/core';
import { FactureProduits } from 'src/app/models/facture-produits.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-produits-facture',
  templateUrl: './produits-facture.page.html',
  styleUrls: ['./produits-facture.page.scss'],
})
export class ProduitsFacturePage implements OnInit {
  
  @Input() factureProduits:FactureProduits []

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {

    this.factureProduits.forEach(prod=>{
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
