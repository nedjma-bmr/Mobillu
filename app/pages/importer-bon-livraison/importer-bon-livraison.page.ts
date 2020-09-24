import { Component, OnInit, Input } from '@angular/core';
import { Facture } from 'src/app/models/facture.model';
import { ModalController } from '@ionic/angular';
import { Livraison } from 'src/app/models/livraison.model';
import { LivraisonProduits } from 'src/app/models/livraison-produits.model';
import { LivraisonsService } from 'src/app/services/livraisons/livraisons.service';
import { LivraisonProduitsService } from 'src/app/services/livraison-produits/livraison-produits.service';
import { ValiderFacturePage } from '../valider-facture/valider-facture.page';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-importer-bon-livraison',
  templateUrl: './importer-bon-livraison.page.html',
  styleUrls: ['./importer-bon-livraison.page.scss'],
})
export class ImporterBonLivraisonPage implements OnInit {

  @Input() idClientImporter: string;
  @Input() InfoFacture: Facture;
  @Input() facture: Facture[]
  BonsLivraisonClientImporter: Livraison[]
  BonsLivraisonImporter = new Array<Livraison>();
  //public BonLivProduitsImporter = new Array<LivraisonProduits>();
  select = false;
  checked = [];
  ProduitsLivrés = new Array<LivraisonProduits>();

  constructor(private modalCrtl: ModalController,
    private _bonsLivService: LivraisonsService,
    private _bonsLivProduitsService: LivraisonProduitsService) { }

  ngOnInit() {

    /**
     * afficher la liste des bons de livraisons pour choisir celui à importer 
     */
    this._bonsLivService.getListLivrNonFactByClientId(this.idClientImporter).subscribe(ListDevis => {
      this.BonsLivraisonClientImporter = ListDevis;

    }

    )

  }


  /**
 * 
 * @param id Séléctioner les bons de livraison à importer 
 */
  SelectionlivraisonImporter(id: string[]) {
    this.select = true;
    console.log(id);

  }

  addCheckbox(event, checkbox: String) {
    this.select = true

    if (event.target.checked) {
      this.checked.push(checkbox)


    } else {
      let index = this.removeCheckedFromArray(checkbox);
      this.checked.splice(index, 1);


      if (this.checked.length == 0)
        this.select = false
    }





  }


  //Removes checkbox from array when you uncheck it
  removeCheckedFromArray(checkbox: String) {
    return this.checked.findIndex((category) => {
      return category === checkbox;

    })

  }

  afficherProduitslivraison() {

    var promise = new Promise((resolve, reject) => {

      this.checked.forEach((bonliiv, index, array) => {



        this._bonsLivProduitsService.get(bonliiv).subscribe(data => {
          this.ProduitsLivrés = this.ProduitsLivrés.concat(data)

          this._bonsLivService.get(bonliiv).subscribe(res => {
            this.BonsLivraisonImporter = this.BonsLivraisonImporter.concat(res)

            if (index === array.length - 1) resolve();

          });
        });
      })
    });

    promise.then(() => {
      this.modalCrtl
        .create({
          component: ValiderFacturePage,
          componentProps: {
             'factureModel': this.InfoFacture,
            'BonLivID': this.checked, 'BonLivList': this.BonsLivraisonImporter
          },

          swipeToClose: true,


        })

        .then(modal => {
          modal.present();
          return modal.onDidDismiss();
        }).then(dataReturned => {
          if (dataReturned.data !== 'close') {
            this.facture.push(dataReturned.data)

          } else {
            this.ProduitsLivrés = []
            console.log(this.ProduitsLivrés)
          }
        })
      this.dismissModal()

    });

  }






  /**
       * fermer la page 
       */
  dismissModal() {
    this.modalCrtl.dismiss();
  }

}
