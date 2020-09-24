import { Component, OnInit } from "@angular/core";
import { CommandesService } from "src/app/services/commandes/commandes.service";
import { commande } from "src/app/models/commande.model";
import {
  ModalController,
  IonRouterOutlet,
  AlertController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { AjoutCommandPage } from "../ajout-command/ajout-command/ajout-command.page";
import { Client } from "src/app/models/client.model";
import { AjoutProduitPage } from "../ajout-produit/ajout-produit/ajout-produit.page";
import { CommandProduits } from "src/app/models/commande-produit.model";
import { CommandesProduitsService } from "src/app/services/commandes_produits/commandes-produits.service";
import { DetailCommandePage } from "../detail-commande/detail-commande/detail-commande.page";
import { ModifiercommandePage } from "../modifiercommande/modifiercommande.page";
import { ClientsService } from "src/app/services/clients/clients.service";

@Component({
  selector: "app-commandes",
  templateUrl: "./commandes.page.html",
  styleUrls: ["./commandes.page.scss"],
})
export class CommandesPage implements OnInit {
  commandes: commande[];
  displayCommandes: commande[];
  gender: string;
  clientModel = new Client();
  commandeModel = new commande();
  commandesproduits: CommandProduits[];
  showEdit = false;
  showDelete = false;
  afficherModification = false;
  public showSearchBar = false;

  constructor(
    private service: CommandesService,
    private modalCtrl: ModalController,
    private router: Router,
    private cmdprodservice: CommandesProduitsService,
    private alertctrl: AlertController,
    private routerOutlet: IonRouterOutlet,
    private clientSer: ClientsService
  ) {}

  ngOnInit() {
    /// récupérer tous les commandes de la base de données
    this.service.getAll().subscribe((data) => {
      this.commandes = data;
      this.displayCommandes = data;
      this.displayCommandes.forEach((cmd) =>
        this.clientSer.get(cmd.id_client).subscribe((g) => {
          cmd.design_client = g.design_client;
        })
      );
    });

    /// récupérer tous les commandes produits de la base de données
    this.cmdprodservice.getAll().subscribe((prod_Cmd) => {
      this.commandesproduits = prod_Cmd;
    });
  }

  // Rechercher dans la liste des commandes selon le numéro ou la date
  async filterList(evt) {
    const searchTerm = evt.target.value.toLowerCase();
    if (this.gender == "numero") {
      if (searchTerm === "") {
        this.displayCommandes = this.commandes;
      } else {
        this.displayCommandes = this.commandes.filter((currentCmd) => {
          return (
            currentCmd.NumCmd.toString()
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
          );
        });
      }
    } else if (this.gender == "date") {
      if (searchTerm === "") {
        this.displayCommandes = this.commandes;
      } else {
        this.displayCommandes = this.commandes.filter((currentCmd) => {
          return (
            currentCmd.date
              .toString()
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
          );
        });
      }
    }
  }

  // ouvrir la page modal "ajouter commande"
  ajoutercmd() {
    this.modalCtrl
      .create({
        component: AjoutCommandPage,
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
  }
  /// ouvrir la modal des details en passant comme donnée la commande cliqué
  async ouvrirDetails(cmd: commande) {
    if (!this.showDelete && !this.showEdit) {
      const modal = await this.modalCtrl.create({
        component: DetailCommandePage,
        swipeToClose: true,
        componentProps: {
          cmnd: cmd,
        },
        cssClass: "my-modal",
      });

      return await modal.present().then((_) => {});
    }
  }

  /**
   * Afficher les icones de modification d'une commande
   */
  Modifier() {
    this.showEdit = true;
    this.afficherModification = false;
    this.showDelete = false;
  }
  /**
   * Afficher les icones de suppression d'une commande
   */
  Supprimer() {
    this.showDelete = true;
    this.afficherModification = false;
    this.showEdit = false;
  }

  /**
   *
   * @param id suppression d'une commande selon son id et les produits dans cette commande
   */

  SupprimerCmd(id: number) {
    this.alertctrl
      .create({
        header: "Supprimer",
        message: "Etes vous sur ?",
        buttons: [
          {
            text: "Oui",
            handler: () => {
              this.showDelete = false;

              this.cmdprodservice.remove(id.toString()).subscribe((data) => {
                if (data.status == "success") {
                  this.displayCommandes = this.commandes.filter(
                    (elem) => elem.NumCmd !== id
                  );

                  // elem :parametre pr pointer les elements de la liste des commandes
                } else {
                  console.error(data.message);
                }
              });

              this.service.remove(id).subscribe(() => {
                console.log(
                  "commande numéro:" + id + " est supprimé avec succès"
                );
              });
            },
          },
          { text: "Non" },
        ],
      })
      .then((alertEl) => alertEl.present());
  }

  // remettre la valeur de afficherModification a true s'il etait sur false et vise vers ça
  modification() {
    this.afficherModification = !this.afficherModification;
  }

  /**
   *
   * @param cmd modifier commande
   */

  ModifierCmd(cmd: commande) {
    this.modalCtrl
      .create({
        component: ModifiercommandePage,
        componentProps: { cmd },
        cssClass: "modifier-devis",
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        this.commandes = this.commandes.filter((std) => {
          if (this.commandeModel.NumCmd === std.NumCmd) {
            return data;
            // return updated commande
          }
          return std;
        });
      });
  }

  // afficher la barre de recherche
  clickedSearchIcon(event: Event) {
    this.showSearchBar = !this.showSearchBar;
  }
}
