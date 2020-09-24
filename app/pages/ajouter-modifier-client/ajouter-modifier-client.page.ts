import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { Client } from 'src/app/models/client.model';
import { Ville } from 'src/app/models/ville.model';
import { VillesService } from 'src/app/services/villes/villes.service';

@Component({
  selector: 'app-ajouter-modifier-client',
  templateUrl: './ajouter-modifier-client.page.html',
  styleUrls: ['./ajouter-modifier-client.page.scss'],
})
export class AjouterModifierClientPage implements OnInit {
// recevoir les données envoyés 
@Input() client : Client;
isUpdate = false; // vérifié si le model est utilisé pr la maj ou nn 
villes: Ville[] ;
clients : Client[];

SelectedYearIdValue : any ;
// data to be updated 
clientModel = new Client();
 
villeModel = new Ville();

  constructor( private modalCrtl:ModalController ,
    private _clientService:ClientsService,
    private _villeService : VillesService) { }
/**
 * afficher la liste des villes 
 */
  ngOnInit() {
    this._villeService.getAll().subscribe(villes=>{
      this.villes=villes;
     
    }); 
    
    if (this.client){ // if client is not null that means 
    // si le modal est on update mode     
    this.isUpdate= true;
    
    this.clientModel = this.client ;
 
  
    
  }
  }

/**
 * Fermer la modal 
 */
  closeModal(){
    this.modalCrtl.dismiss(null, 'fermé');
   }
   
   
/**
 * Enregister le client modifié ou ajouté dans la bdd 
 */
   
   onSubmit(){

    // le modal est en mode modifier un client , donc on le met à jour ds bdd

    if(this.isUpdate){
      this._clientService.update(this.clientModel , this.client.id).subscribe(()=>
      {
         
        this.modalCrtl.dismiss(this.clientModel,'updated');
        
      });
     
// sinon le modal est ds le mode d'ajout d'un client , donc on l'enregistre 
    } else {
     

     this._clientService.create(this.clientModel).subscribe(response =>
       {this.modalCrtl.dismiss(response,'created');

     });

    }
    
 
 }

 /**
  * permet d'afficher la ville selectionner
  * @param idVille 
  */
 changeDesignVille(idVille : string){
   var ville = this.villes.find(elem => elem.id_ville == idVille)
   this.clientModel.design_ville = ville.design_ville;
 }
  
}
