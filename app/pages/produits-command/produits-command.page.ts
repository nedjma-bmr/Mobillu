import { Component, OnInit, Input } from '@angular/core';
import { produit } from 'src/app/models/produit.model';
import { ModalController } from '@ionic/angular';
import { CommandProduits } from 'src/app/models/commande-produit.model';

@Component({
  selector: 'app-produits-command',
  templateUrl: './produits-command.page.html',
  styleUrls: ['./produits-command.page.scss'],
})
export class ProduitsCommandPage implements OnInit {
@Input() public produits:CommandProduits[];
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    // calculer le prix ttc pour chaque commande produit
    for(let cmdp of this.produits){
      cmdp.prixttc= Number (cmdp.pvht) + Number (cmdp.TVA/100 * cmdp.pvht); 
    }
  }

  // fermer la modal
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
