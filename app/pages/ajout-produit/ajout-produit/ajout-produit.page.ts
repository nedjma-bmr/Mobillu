import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ModalController, AlertController, IonInput } from "@ionic/angular";
import { CommandesProduitsService } from "src/app/services/commandes_produits/commandes-produits.service";
import { ClientsService } from "src/app/services/clients/clients.service";
import { CommandesService } from "src/app/services/commandes/commandes.service";
import { ProduitsService } from "src/app/services/produits/produits.service";
import { CommandProduits } from "src/app/models/commande-produit.model";
import { produit } from "src/app/models/produit.model";
import { IonicSelectableComponent } from "ionic-selectable";

import { famille } from "src/app/models/famille.model";
import { FamilleService } from "src/app/services/familles/famille.service";
import { StockService } from "src/app/services/stock/stock";

@Component({
  selector: "app-ajout-produit",
  templateUrl: "./ajout-produit.page.html",
  styleUrls: ["./ajout-produit.page.scss"],
})
export class AjoutProduitPage implements OnInit {
  @Input() public num: number;
  @ViewChild("remise") remiseElement: IonInput;
  qteProduit = 1;
  checked=false ; 
  remise   ;

  commandesproduits: CommandProduits[];
  produitModel = new produit();
  produitModel1 = new produit();
  produitCmd = new produit();

  produits: produit[];
  familles: famille[];
  command_produit = new CommandProduits();
  displayProduit: produit[];
  familleModel = new famille();
  commandesproduits1: CommandProduits[] = [];
  produitParFamille: [produit];
  produitParFamille2: produit[] = [];
  @ViewChild("selectComponent") selectComponent: IonicSelectableComponent;
  newCmdProduit = new CommandProduits();

  constructor(
    private modalCrtl: ModalController,
    private cmdprodservice: CommandesProduitsService,
    private prodservice: ProduitsService,
    private servicefam: FamilleService,
    private alertctrl: AlertController,
    private stockSer: StockService
  ) {}

  ngOnInit() {
    // récupérer la liste des familles
    this.servicefam.getAll().subscribe((fam) => {
      this.familles = fam;
    });

    // récupérer la liste des commandes produits
    this.cmdprodservice.getAll().subscribe((prod_Cmd) => {
      this.commandesproduits = prod_Cmd;
    });

    // récupérer la liste des produits
    this.prodservice.getAll().subscribe((produit) => {
      this.produits = produit;
      this.displayProduit = produit;
    });
  }

  /*
  récuperer la valeur de ionis-selectable (un produit) quand celui-là change 
  puis calculer la TVA et le prix TTC 
  */
  portChange(event) {
    this.produitCmd = event.value;

    this.newCmdProduit.TVA = (this.produitCmd.TVA / 100) * this.produitCmd.pvht;
    this.newCmdProduit.TVA = Number(this.newCmdProduit.TVA.toFixed(2));
    this.newCmdProduit.prixttc =
      Number(this.produitCmd.pvht) + Number(this.newCmdProduit.TVA);
    this.newCmdProduit.puht = this.newCmdProduit.prixttc;
  }

  // récuperer la valeur de ionis-selectable (famillle) quand celui-là change
  portChange2(event) {
    this.familleModel = event.value;
    console.log(this.familleModel);/*
    this.prodservice.get2(this.familleModel.code_fam).subscribe((pF)=>{
      console.log(pF);
      this.produitParFamille=pF;
    })
     */
    this.prodservice.get(this.familleModel.code_fam).subscribe(produit=>{
      this.produitParFamille= produit;
    }) 
 
  }


  //incrémenter la quntité du produit selectionné
  increase() {
    this.qteProduit++;

    this.newCmdProduit.puht = this.newCmdProduit.prixttc * this.qteProduit;
  }

  // decrémenter la quantité du produit selecionné
  decrease() {
    this.qteProduit--;

    this.newCmdProduit.puht = this.newCmdProduit.prixttc * this.qteProduit;
  }
  /**
   * Enregistrer le produit ajoutée dans une commande produit et l'envoyer  vers la page ajoute-command
   */
  async Register() {
    if (this.produitCmd.id_prod == undefined) {
      let alert = this.alertctrl.create({
        message: "Veuillez d abord choisir un produit",
        buttons: ["Annuler", "OK"],
      });

      (await alert).present();
    } else {
      this.newCmdProduit.TVA = this.produitCmd.TVA;
      this.newCmdProduit.id_produit = this.produitCmd.id_prod;
      this.newCmdProduit.design_prod = this.produitCmd.design_prod;
      this.newCmdProduit.code_prod = this.produitCmd.code_prod;
      this.newCmdProduit.qte = this.qteProduit;
      this.newCmdProduit.pvht = this.produitCmd.pvht;
      this.newCmdProduit.remise
      this.qteProduit = 1;

    

      this.modalCrtl.dismiss(this.newCmdProduit);
      console.log(this.newCmdProduit);
    }
  }
 

  /*mettre le focus sur le champ de saisie de remise*/
  remiseFocus() {
    this.remiseElement.setFocus();
  }

 // Fermer la page modal
  dismissModal() {
    this.modalCrtl.dismiss("fermé");
  }
}
