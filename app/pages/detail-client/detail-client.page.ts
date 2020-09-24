import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { Devis } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/services/devis/devis.service';
import { LivraisonsService } from 'src/app/services/livraisons/livraisons.service';
import { Livraison } from 'src/app/models/livraison.model';


@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.page.html',
  styleUrls: ['./detail-client.page.scss'],
})
export class DetailClientPage implements OnInit {

   clientDevis : Devis[];
   clientLivraison : Livraison [];
  constructor( private _clientService : ClientsService ,
    private _devisService : DevisService , 
    private _livraisonService : LivraisonsService) { }

  @ViewChild('slides', { static: true }) slider: IonSlides;

  segment = 0;

  

  ngOnInit() {
    /**
     * afficheer la liste des devis d'un client selon son id 
     */
   this._devisService.getListDevisByClientId(this._clientService.getCurrentClientId()).subscribe
   (listDevis =>{this.clientDevis = listDevis;});

   this._livraisonService.getListLivraisonByClientId(this._clientService.getCurrentClientId()).subscribe
   (listBonLivraison =>{this.clientLivraison = listBonLivraison; 
  });
  }
/**
 *passer d'un segment n à n+1  
 */
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
   
  }
  
/**
 * afficher slide selon segment 
 */
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  


}
