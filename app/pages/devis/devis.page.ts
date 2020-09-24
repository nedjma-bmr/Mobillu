import { Component, OnInit } from '@angular/core';
import { Devis } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/services/devis/devis.service';
import { Client } from 'src/app/models/client.model';
import { ModalController, IonRouterOutlet, AlertController } from '@ionic/angular';




import { AjouterDevisPage } from '../ajouter-devis/ajouter-devis.page';
import { DetailDevisPage } from '../detail-devis/detail-devis.page';
import { DevisProduitsService } from 'src/app/services/devis-produits/devis-produits.service';
import { ModifierDevisPage } from '../modifier-devis/modifier-devis.page';
  
@Component({
  selector: 'app-devis',
  templateUrl: './devis.page.html',
  styleUrls: ['./devis.page.scss'],
})
export class DevisPage implements OnInit {
  devis : Devis[];
  clients : Client[];
  clientModel = new Client();
  devisModel = new Devis();
  showEdit = false ; 
  showDelete= false ; 
  afficherModification= false ; 
  displayDevis : Devis[] ; 
  filtrer : string = '' ; 
  public showSearchBar = false;
  constructor(private _devisService: DevisService, 
   
    private modalCtrl: ModalController, 
    private routerOutlet : IonRouterOutlet,
    private alertCtrl: AlertController,
    private _devisProduits : DevisProduitsService
  ) { }

  ngOnInit() { 
 /**
  * afficher la liste des devis 
  */
    this._devisService.getAll().subscribe(data=>{
      this.devis=data;
      this.displayDevis = data ; 
    }); 

    
  
}



/**
 * 
 * @param evt permet la recherche d'un client selon son code ou sa désignation
 */
async filterList(evt) {
 
  const searchTerm = evt.target.value.toLowerCase();
if (this.filtrer=="numero") { 
  if (searchTerm === "") {
    this.displayDevis = this.devis;
  }
  else
  {
  this.displayDevis = this.devis.filter((currentDevis)=> {
    
      return (currentDevis.num_proforma.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    });
    }
  } else if (this.filtrer=="date") {

    if (searchTerm === "") {
      this.displayDevis = this.devis;
    }
    else
    {
    this.displayDevis = this.devis.filter((currentDevis)=> {
      
        return (currentDevis.date_proforma.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      });
      }


  }
}
  
/**
 * 
 * @param id afficher la page de détails d'un devis en lui passant en parametre 
 * le devis 
 */
async detailDevis(id:string){
     
  var devisAfficherData = this.devis.find(elem => elem.id_proforma == id);
 if (!this.showDelete && !this.showEdit) {
    const modal = await this.modalCtrl.create({
  component: DetailDevisPage, 
  componentProps: {'devisAfficher' : devisAfficherData},
  cssClass: 'my-modal',
  swipeToClose: true , 
  presentingElement: this.routerOutlet.nativeEl
});

return  await modal.present();
}
}

/**
 * permet d'afficher la page d'ajout d'un devis et le récupérer une fois ajouté 
   * pr l'afficher avec la liste des devis
 */
ajouterDevis(){
  this.modalCtrl
  .create({
    component: AjouterDevisPage,
  })
  .then(modal => {
    modal.present();
    return modal.onDidDismiss();
  })
  .then(dataReturned =>{
    if (dataReturned.data !=='close'){
      this._devisService.getAll().subscribe(data=>{
        this.devis=data;
        this.displayDevis = data ; 
      }); 
    }
  })
    
}
/**
 * Afficher les icones de modification d'un devis 
 */
Modifier(){
  this.showEdit = true ; 
  this.afficherModification = false;
  this.showDelete = false; 
}
/**
 * Afficher les icones de suppression d'un devis 
 */
Supprimer (){
  this.showDelete= true ; 
  this.afficherModification = false;
  this.showEdit = false; 

}

/**
 * 
 * @param id suppression d'un devis selon son id et les produits dans ce devis 
 */

SupprimerDevis(id:string){
 
  this.alertCtrl.create({
    header:'Supprimer',
    message: 'Etes vous sur ?',
    buttons:[
      {
      text:'Oui',
      handler :() => {
        this.showDelete= false ; 
        this._devisProduits.remove(id).subscribe( res=>{

        this._devisService.remove(id).subscribe((data)=>{
         
         
          if(data.status == "success"){
           
          this.displayDevis = this.devis.filter(elem => elem.id_proforma !== id);
          
          // elem :parametre pr pointer les elements de la liste des devis
          }else{
            console.error(data.message);
          }
        });
      })
      }
    },
    { text: 'Non'}
    ]
    

    
  }).then (alertEl => alertEl.present());
 
}

modification(){
  this.afficherModification = !this.afficherModification;
}


/**
 * 
 * @param id modifier devis 
 */


ModifierDevis( devis : Devis){
  
  this.modalCtrl.create({
    component: ModifierDevisPage,
    componentProps: {devis} ,
    cssClass: 'modifier-devis',

  })
  .then(modal => {
    modal.present();
    return modal.onDidDismiss();
  }).then (({data, role}) =>{
    this.devis= this.devis.filter(std => {
      if (this.devisModel.id_proforma=== std.id_proforma){
        return data ;
        // return updated devis 
      }
      return std;
    })
  });
}



clickedSearchIcon(event: Event) {
  this.showSearchBar = !this.showSearchBar;
}
}
