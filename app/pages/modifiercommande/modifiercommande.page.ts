import { Component, OnInit, Input } from '@angular/core';
import { commande } from 'src/app/models/commande.model';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { CommandesService } from 'src/app/services/commandes/commandes.service';
import { CommandesProduitsService } from 'src/app/services/commandes_produits/commandes-produits.service';
import { ModalController } from '@ionic/angular';
import { CommandProduits } from 'src/app/models/commande-produit.model';
import { ProduitsCmdPage } from '../produits-cmd/produits-cmd.page';

@Component({
  selector: 'app-modifiercommande',
  templateUrl: './modifiercommande.page.html',
  styleUrls: ['./modifiercommande.page.scss'],
})
export class ModifiercommandePage implements OnInit {
@Input() public cmd:commande;
@Input () CmdProduits : CommandProduits []
cmdModel= new commande();
clients : Client [];
cmdProds:CommandProduits[]=[];
/*
  Constructeur
*/
  constructor(private clientSer:ClientsService,
    private service:CommandesService,
    private cmdProdSer:CommandesProduitsService,
    private modalCtrl:ModalController,
    ) { }

  /*
  Se declenche lors du chargment de la page
  */  
  ngOnInit() {
  this.cmdModel = this.cmd;

  this.clientSer.getAll().subscribe((clients)=>{
    this.clients=clients;
  });
  }

   /**
     * fermer la modal
     */
    dismissModal(){
      this.modalCtrl.dismiss();
    }

  // Enregistrer les modifications 
    onSubmit(){
      this.service.update(this.cmdModel , this.cmd.NumCmd).subscribe((c)=>
      {
        console.log(c);
         console.log(this.cmdModel);
        this.modalCtrl.dismiss(this.cmdModel,'updated');
        
      });
      
    }
  
    /* 
    ouvrir la page de modificaion des produits de la commande
    */
    ModifierProduitsCmd(id){
    const     ModifierProduit= true ; 
     this.cmdProdSer.get(id).subscribe(list=>{
       this.cmdProds = list ; 
        console.log(list);
     
      this.modalCtrl.create({
        component: ProduitsCmdPage,
        componentProps: {'cmdProds' : this.cmdProds , 'ModifierProd' : ModifierProduit , 'numCmd': id }, 
      
      })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
    })
    }

    /**
     *  Changer le nom du client lors de la modification du client dans la commande
     */
    changeDesignVille(idclient : string){
      var client = this.clients.find(elem => elem.id == idclient)
      this.cmdModel.design_client = client.design_client;
    }

}
