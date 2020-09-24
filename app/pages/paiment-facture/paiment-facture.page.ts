import { Component, OnInit, Input } from '@angular/core';
import { FacturesService } from 'src/app/services/factures/factures.service';
import { Facture } from 'src/app/models/facture.model';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Paiment } from 'src/app/models/paiment.model';
import { PaimentService } from 'src/app/services/paiment/paiment.service';
import { ModePaiment } from 'src/app/models/mode_paiment.model';
import { ModePaimentService } from 'src/app/services/modePaiment/mode-paiment.service';

@Component({
  selector: 'app-paiment-facture',
  templateUrl: './paiment-facture.page.html',
  styleUrls: ['./paiment-facture.page.scss'],
})
export class PaimentFacturePage implements OnInit {
  modePaiment : ModePaiment[]
  modeModel = new ModePaiment()
  paimentModel = new Paiment() ;
  myDate: String = new Date().toISOString();
@Input () detailFacture: Facture


  constructor( private _factureService: FacturesService, 
    private modalCrtl:ModalController , 
    private alertController: AlertController, 
    private _paimentService : PaimentService,
    public loadingCtrl: LoadingController , 
    private _modePaimentService : ModePaimentService ) {

    }



  ngOnInit() {
    
this._modePaimentService.getAll().subscribe(modePaim=>{
  this.modePaiment= modePaim
})
    
   /*this._factureService.update(this.detailFacture,this.detailFacture.id_Fact).subscribe(data=>{
     console.log(data)
   })
*/
  }

  async onSubmit(){
    
     
   if (this.paimentModel.id_modePaiment==undefined){
    let alert = this.alertController.create({
      cssClass:'my-custom-class',
      
      message: 'Veuillez choisir le mode de paiment  ',
      buttons: ['Annuler', 'OK']
    });

    (await alert).present();

   } else {

    if(this.paimentModel.montant_payer>this.detailFacture.reste_du){
      let alert = this.alertController.create({
        
        message: 'Montant supérieur au total de la facture ',
        buttons: ['Annuler', 'OK']
      });

      (await alert).present();

    } else {
      
      this.detailFacture.reste_du = this.detailFacture.reste_du-this.paimentModel.montant_payer 
      console.log(this.paimentModel.id_modePaiment)
      this.paimentModel.date_paiment= this.myDate.toString()
      this.paimentModel.id_Fact= this.detailFacture.id_Fact;
      //enregisterement du paiement
      console.log(this.paimentModel)
      this._paimentService.create(this.paimentModel).subscribe(data=>{
        console.log(data)
        if(data == 'succes'){
        //Mise à jour de reste du dans la facture
        this._factureService.update(this.detailFacture, this.detailFacture.id_Fact).subscribe(data=>{
        console.log(data)
          this.modalCrtl.dismiss(this.detailFacture.reste_du)

        })
      }else{
        //afficher l'alerte erreu ajout de paiement
      }
      })
    
    }
   }
    
    
    
    
  }

  


  /**
 * Fermer la page
 */
closeModal(){
  this.modalCrtl.dismiss('fermé');
 }
}
