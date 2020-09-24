import { Component, OnInit } from "@angular/core";
import { ProduitsService } from "src/app/services/produits/produits.service";
import { produit } from "src/app/models/produit.model";
import { famille } from "src/app/models/famille.model";
import { AlertController, ModalController } from "@ionic/angular";
import { FamilleService } from "src/app/services/familles/famille.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-produit",
  templateUrl: "./produit.page.html",
  styleUrls: ["./produit.page.scss"],
})
export class ProduitPage implements OnInit {
  gender: string = ""; // pr filtrer la recherche
  produits: produit[];
  familles: famille[];
  displayProduits: produit[];

  constructor(
    private _produitsService: ProduitsService,
    private famservice: FamilleService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    /**
     * afficher la liste des produits
     */

    this._produitsService.getAll().subscribe((Response) => {
      this.produits = Response;
      this.displayProduits = Response;
    });
    /**
     * afficher la liste des familles
     */
    this.famservice.getAll().subscribe((res) => {
      this.familles = res;
    });
  }
  /**
   *
   * @param evt filter la recherche selon le code ou la designatio d'un produit
   */
  filterList(evt: any) {
    const searchTerm = evt.target.value.toLowerCase();
    if (this.gender == "design_prod") {
      if (searchTerm === "") {
        this.displayProduits = this.produits;
      } else {
        this.displayProduits = this.produits.filter((currentProduit) => {
          return (
            currentProduit.design_prod
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
          );
        });
      }
    } else if (this.gender == "code_prod") {
      if (searchTerm === "") {
        this.displayProduits = this.produits;
      } else {
        this.displayProduits = this.produits.filter((currentProduit) => {
          return (
            currentProduit.code_prod
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
          );
        });
      }
    }
  }
}
