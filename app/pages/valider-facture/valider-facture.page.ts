import { Component, OnInit, Input } from '@angular/core';
import { LivraisonProduits } from 'src/app/models/livraison-produits.model';
import { ModalController, ToastController } from '@ionic/angular';
import { FacturesService } from 'src/app/services/factures/factures.service';
import { FactureProduitsService } from 'src/app/services/facture-produits/facture-produits.service';
import { Facture } from 'src/app/models/facture.model';
import { FactureProduits } from 'src/app/models/facture-produits.model';
import { LivraisonsService } from 'src/app/services/livraisons/livraisons.service';
import { Livraison } from 'src/app/models/livraison.model';
import { LivraisonProduitsService } from 'src/app/services/livraison-produits/livraison-produits.service';

@Component({
  selector: 'app-valider-facture',
  templateUrl: './valider-facture.page.html',
  styleUrls: ['./valider-facture.page.scss'],
})
export class ValiderFacturePage implements OnInit {

 
  @Input() factureModel: Facture
  @Input() BonLivID = [];
  @Input() BonLivList: Livraison[];
  livraisonProduits= new Array<LivraisonProduits>();
  livraisonModel = new Livraison()
  livraison: Livraison[];
  ProduitsFacturer: FactureProduits[] = []

  constructor(private modalCtrl: ModalController,
    private _factureService: FacturesService,
    private _factureProduitsService: FactureProduitsService,
    public toast: ToastController,
    private _livraisonService: LivraisonsService,
    private _bonsLivProduitsService: LivraisonProduitsService) { }

  ngOnInit() {
    //initialisation reste du de la facture
    this.factureModel.reste_du =0;
console.log(this.BonLivList)
    this.BonLivList.forEach(bonliiv => {

     
      this._bonsLivProduitsService.get(bonliiv.id_bonLiv).subscribe(data => {
        //importation des produits de bons de livraison vers des produits de facture
        data.forEach(prod => {
          prod.prixttc = Number(prod.pvht) + (Number(prod.pvht) * (Number(prod.TVA) / 100));
          prod.prixttc = Number(prod.prixttc.toFixed(2))
          prod.puht = Number((prod.prixttc * prod.qte).toFixed(2));
          prod.total = Number(prod.puht) * (1 - (Number(prod.remise / 100)));
          prod.total = Number(prod.total.toFixed(2));
          
          //Calculer le reste dû de la facture
          this.factureModel.reste_du += Number( prod.total);

          //création des objets produitFacture
          const prodFact = new FactureProduits()

          prodFact.id_prod = prod.id_prod;
          prodFact.puht = prod.puht;
          prodFact.qte = prod.qte;
          prodFact.remise = prod.remise

          this.ProduitsFacturer.push(prodFact)

        })

        this.livraisonProduits = this.livraisonProduits.concat(data)


      })
    })
  }
  /**
   * enregistrement de la facture et les produits importées dans la bdd 
   */
  ValiderFacture() {

    this._factureService.create(this.factureModel).subscribe(async idFacture => {

      //ajouter l'id de la facture pour chaque produit 
      this.ProduitsFacturer.forEach(prodFacturer => {
        prodFacturer.id_Fact = idFacture.toString();

      })
      
      //enregistrer l'id de la facture dans le model 
      this.factureModel.id_Fact = idFacture.toString();

      console.log(this.factureModel);
      //enregistrement des produits de la facture
      this._factureProduitsService.add(this.ProduitsFacturer).subscribe()


      this.toast.create({
        message: 'Facture créé avc succés',
        duration: 2000
      }).then((toastData) => {

        toastData.present();

        //Mise à jour des Bons livraisons (validation)
        this.BonLivList.forEach(bonLiv => { 
          bonLiv.num_Fact= idFacture.toString()
          this._livraisonService.update(bonLiv, bonLiv.id_bonLiv).subscribe(data => {
            this.modalCtrl.dismiss(bonLiv)
          })

        })
        this.modalCtrl.dismiss(this.factureModel)
      });

    });
  }
  /**
     * fermer la page 
     */
  dismissModal() {
    this.modalCtrl.dismiss('close');

  }
}
