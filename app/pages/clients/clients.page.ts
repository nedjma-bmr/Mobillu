import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { AlertController, ModalController, ActionSheetController } from '@ionic/angular';

import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Devis } from 'src/app/models/devis.model';
import { AjouterModifierClientPage } from '../ajouter-modifier-client/ajouter-modifier-client.page';
import { MapOperator } from 'rxjs/internal/operators/map';
import { Ville } from 'src/app/models/ville.model';





@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})

export class ClientsPage implements OnInit {
gender : string ='' ; 
//liste de tout les clients  
clients: Client[];
clientModel = new Client();
villeModel = new Ville();
//liste des client affichés
displayClients:Client[];
  devis:Devis[];
 

  constructor(
    private _clientService:ClientsService ,
     private alertCtrl: AlertController , 
     private modalCtrl: ModalController , 
     private router : Router , 
       
     ) { }
// lancer à l'initialisation de la page
/**
 * permet d'afficher la liste des clients dans le navigateaur au lancement de l'application 
 */
   ngOnInit()  {
    this._clientService.getAll().subscribe(data=>{
      
      this.clients = data ; 
       
      this.displayClients = data;
    }); 

    
    
  }
/**
 * 
 * @param evt permet la recherche d'un client selon son code ou sa désignation
 */
async filterList(evt) {
 
  const searchTerm = evt.target.value.toLowerCase();
if (this.gender=="nom") { 
  if (searchTerm === "") {
    this.displayClients = this.clients;
  }
  else
  {
  this.displayClients = this.clients.filter((currentClient)=> {
    
      return (currentClient.design_client.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    });
    }
  } else if (this.gender=="code") {

    if (searchTerm === "") {
      this.displayClients = this.clients;
    }
    else
    {
    this.displayClients = this.clients.filter((currentClient)=> {
      
        return (currentClient.code_client.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      });
      }


  }
}
  

  /**
   * permet d'afficher la page d'ajout d'un client et le récupérer une fois ajouté 
   * pr l'afficher avec la liste des clients 
   */
  addClient(){
    this.modalCtrl
    .create({
      component: AjouterModifierClientPage
    })
     .then(modal => {
       modal.present();
       return modal.onDidDismiss();
     })
     .then(({data,role}) =>{
       if (role==='created'){
         this.displayClients.push(data);
       }
     });
  }


/**
 * 
 * @param client passer les informations du client à la page de mofid 
 * et le retourner pr le mettre à jour ds la liste  
 */
  updateClient(client:Client){
     this.modalCtrl
     .create({
       component: AjouterModifierClientPage,
       // il faut passer l'objet client au model
       componentProps: {client}
     })
      .then (modal => {
        modal.present() ;
       return modal.onDidDismiss();
  }).then (({data, role}) =>{
    this.clients = this.clients.filter(std => {
      if (this.clientModel.id=== std.id){
        return data ; // return updated client 
      }
      return std;
    })
  });


  }


/**
 * 
 * @param id suppression d'un client selon son id 
 */

  removeClient(id:string){
    this.alertCtrl.create({
      header:'Supprimer',
      message: 'Etes vous sur ?',
      buttons:[
        {
        text:'Oui',
        handler :() => {
          this._clientService.remove(id).subscribe((data)=>{
            if(data.status == "success"){
             
            this.displayClients = this.clients.filter(elem => elem.id !== id);// elem :parametre pr pointer les elements de la liste des clients 
            }else{
              console.error(data.message);
            }
          });
        }
      },
      { text: 'Non'}
      ]
      
  
      
    }).then (alertEl => alertEl.present());
    
  }
/**
 * 
 * @param clientId passer l'id du client courant en parametre  et le définir dans la fonction setclientcurrentid
 * naviguer vers la page details client pr afficher les détails du client courant 
 */
openDetail(clientId: string){
  this._clientService.setCurrentClientId(clientId);
  this.router.navigateByUrl('/detail-client');
  
}
 
}
