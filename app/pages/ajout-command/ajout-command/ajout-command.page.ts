import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { IonSlides, AlertController, ModalController } from "@ionic/angular";
import { Client } from "src/app/models/client.model";
import { ClientsService } from "src/app/services/clients/clients.service";
import { CommandesService } from "src/app/services/commandes/commandes.service";
import { commande } from "src/app/models/commande.model";
import { Devis } from "src/app/models/devis.model";
import { IonicSelectableComponent } from "ionic-selectable";
import { produit } from "src/app/models/produit.model";
import { CommandesProduitsService } from "src/app/services/commandes_produits/commandes-produits.service";
import { CommandProduits } from 'src/app/models/commande-produit.model';
import { ProduitsService } from 'src/app/services/produits/produits.service';
import { AjoutProduitPage } from '../../ajout-produit/ajout-produit/ajout-produit.page';
import { DevisService } from 'src/app/services/devis/devis.service';
import { ImporterDevisPage } from '../../importer-devis/importer-devis.page';

@Component({
  selector: "app-ajout-command",
  templateUrl: "./ajout-command.page.html",
  styleUrls: ["./ajout-command.page.scss"],
})
export class AjoutCommandPage implements OnInit {

  // la date d'aujourd'hui
  today = new Date();
  commandModel = new commande();
  clients: Client[];
  produits: produit[];
  commandes: commande[];
  commandesproduits: CommandProduits[];
  clientModel = new Client();
  clientcmd = new Client();
  produitcmd = new produit();
  //la valeur de ngModel pour importer un devis
  deviscmd = new Devis();
  /// la liste des devis
  devis: Devis[] = [];
  produitcmd2 = new produit();
  produitModel: produit[] = [];
  command_produit = new CommandProduits();
  produit_de_commandes: produit[] = [];
  num: number;

  @Input() public produits1: produit[] = [];
  //produitDevis = new Produit();
  @ViewChild("selectComponent") selectComponent: IonicSelectableComponent;

  selectedUsers = null;
  cmdProds: CommandProduits[] = [];

  constructor(
    private alertCtrl : AlertController,
    private modalcrtl: ModalController,
    private cmdprodservice: CommandesProduitsService,
    private _clientService: ClientsService,
    private service: CommandesService,
    private prodservice: ProduitsService,
    private devisSER: DevisService
  ) {}

  ngOnInit() {
    // récupérer la liste des clients
    this._clientService.getAll().subscribe((client) => {
      this.clients = client;
    });

    // récupérer la liste des commandes produits
    this.cmdprodservice.getAll().subscribe((prod_Cmd) => {
      this.commandesproduits = prod_Cmd;
      console.log(prod_Cmd);
    });

    // récuperer la liste des commandes et incrémenter le numéro de commande
    this.service.getAll().subscribe((cmd) => {
      this.commandes = cmd;
      this.num = this.commandes[this.commandes.length - 1].NumCmd++;
      console.log(this.commandes);
    });

    // récupérer la liste des prodiuts
    this.prodservice.getAll().subscribe((produit) => {
      this.produits = produit;
    });
    // récupérer la liste des devis
    this.devisSER.getAll().subscribe((devislist) => {
      this.devis = devislist;
    });
  }
 
/**
 * enregister le client et les produits ajoutés dans la commande dans la bdd 
 */
async submitForm1() {
 
   this.commandModel.id_client = this.clientcmd.id;
  if (this.commandModel.id_client  == undefined ) {
   let prompt = this.alertCtrl.create({
     message: 'Veuillez séléctionner un client',
     buttons: [
       {
         text: 'OK',
         handler: data => {
          
         }
       }
     ]
   });
   (await prompt).present();
  } else { 
   if (this.cmdProds.length== 0 ) { 
     let prompt = this.alertCtrl.create({
       message: 'Veuillez choisir au moins un produit',
       buttons: [
         {
           text: 'OK',
           handler: data => {
             
           }
         }
       ]
     });
     (await prompt).present();
    
      
    } else { 
      this.commandModel.NumCmd = this.num+1;
      this.commandModel.date = this.today;
   this.commandModel.id_client = this.clientcmd.id;
      ///Enregistrer la commande
      this.service.create(this.commandModel).subscribe((command) => {
        console.log(command);
        this.modalcrtl.dismiss(this.commandModel ); 
      });

    /**
     * Enregistrer les produits de la commande
     * **/
  
   for(let i=0;i< this.cmdProds.length;i++){
    this.cmdProds[i].Num_cmd = this.num+1;
   this.cmdprodservice.create(this.cmdProds[i]).subscribe((cmd)=>{
     console.log(cmd);
   });
   }
   
  
  
   
  }
}
  
}
 

  // ouvrir la fenetre importer un devis
  async importerDevis(id: string) {
    this.modalcrtl
      .create({
        component: ImporterDevisPage,
        componentProps: { idClientDevisImporter: id, num: this.num + 1 },
        swipeToClose: true,
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        if (role === "created") {
          this.commandes.push(data);
        }
      });

    this.closeModal();
  }



  // ouvrir la fenetre d'ajout produit
  async AjouterProduit(){
   
    
    const modal = await this.modalcrtl.create({
  component: AjoutProduitPage, 
  
  
  swipeToClose: true , 
  
});

modal.onDidDismiss().then(dataReturned=>{
  if (dataReturned.data !== 'fermé'){
  this.cmdProds.push(dataReturned.data);
  console.log(dataReturned.data);
  }
})
return  await modal.present();
}

  // fermer la modal
  closeModal() {
    this.modalcrtl.dismiss(null, "fermé");
  }
}
