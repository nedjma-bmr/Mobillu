import { Component, OnInit, Input } from "@angular/core";
import { ModalController, NavController, Platform } from "@ionic/angular";
import { commande } from "src/app/models/commande.model";
import { CommandesService } from "src/app/services/commandes/commandes.service";
import { CommandesProduitsService } from "src/app/services/commandes_produits/commandes-produits.service";
import { CommandProduits } from "src/app/models/commande-produit.model";
import { ProduitsService } from "src/app/services/produits/produits.service";
import { produit } from "src/app/models/produit.model";
import { HttpClient } from "@angular/common/http";
import { ProduitsCommandPage } from '../../produits-command/produits-command.page';
import { privateDecrypt } from 'crypto';
import { reduce } from 'rxjs/operators';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.page.html',
  styleUrls: ['./detail-commande.page.scss'],
})
export class DetailCommandePage implements OnInit {
  pdfObj= null ; 
  base64Image = null ;
  logoData = null ; 
  @Input() cmdAfficher: commande; // recevoir le devis envoyé 
  commandProd: CommandProduits[];

  @Input() public cmnd: commande;
  design_client : string;
  tt_tva: number = 0;
  tt_ht: number = 0;
  TTC: number = 0;
  remise:number=0;
  total:number=0;
  montant_remise:number=0;
  cmdprods: CommandProduits[] = [];
  produits: produit[] = [];
  constructor(
    private modalCtrl: ModalController,
    private service: CommandesService,
    private cmdprodser: CommandesProduitsService,
    private sprod: ProduitsService,
    private navctrl : NavController,
    private plt : Platform,
    private http: HttpClient,
    private clientS: ClientsService,
    public fileOpener:FileOpener,
    public file:File,
   
  ) {}

  ngOnInit() {
    this.cmdprodser.get(this.cmnd.NumCmd).subscribe((cmdp) => {
      this.cmdprods = cmdp;
      //calculer les totals (ht,ttc,tva,remise,montant_remise) de la commande
      for (let i = 0; i < this.cmdprods.length; i++) {
        
          this.tt_ht += Number(this.cmdprods[i].pvht * this.cmdprods[i].qte)
          this.TTC += (+(this.cmdprods[i].puht));
          this.tt_tva += (Number(this.TTC) -  Number(this.tt_ht));
          this.remise += Number(this.cmdprods[i].remise);
          this.total +=  Number (this.cmdprods[i].puht) * (1- (Number (this.remise/100)));
          this.montant_remise += Number(this.TTC)- Number(this.total);
        
      }

    });

    ///recuperer la designation du client ayant fait la commande
   this.clientS.getDesigntation(this.cmnd.id_client).subscribe((design)=>{
       this.design_client = design;
    })
    

     /**
     * recuprer l'image à l'initialisation
     */
    this.loadLocalAssetToBase64();
  }


  /**
   * transférer l'image récupéré à base64
   */
  loadLocalAssetToBase64() {
    this.http
      .get("./assets/icon/logo.jpg", { responseType: "blob" })
      .subscribe((res) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoData = reader.result;
        };
        reader.readAsDataURL(res);
      });
  }

 

///download pdf


DownloadPdf() {
  var moi = this.cmdprods;
  var dataRow = [];
  dataRow.push(["Désignation ", "Quantité", "Prix de vente", "Prix "]);
  var bodyData = [];
  moi.forEach((sourceRow)=> {
    console.log(sourceRow);
    dataRow.push([
      sourceRow.design_prod,
      sourceRow.qte,
      sourceRow.puht,
      (sourceRow.puht * sourceRow.qte).toFixed(2),
    ]);
  });

  let logo = {};
  logo = { image: this.logoData, width: 100, alignment: "right" };
  // l'affichage du pdf à télécharger
  const docDefinition = {
    content: [
      {
        columns: [
          logo,
          {
            text: "Commande",
            style: "header",
            alignment: "right",
          },
        ],
      },

      {
        columns: [
          {
            width: "40%",
            text: "Numéro commande ",
            style: "subheader",
          },
          {
            width: "40%",
            text: "Client",
            style: "subheader",
          },
          {
            width: "40%",
            text: "Date",
            style: "subheader",
          },
        ],
      },
      {
        columns: [
          {
            width: "40%",
            text: this.cmnd.NumCmd,
          },
          {
            width: "40%",
            text: this.design_client,
          },
          {
            width: "40%",
            text: this.cmnd.date,
          },
        ],
      },
      { text: "Détails de la commande : ", style: "subheadere" },
      {
        style: "tableExample",
        table: {
          widths: [100, "*", 200, "*"],
          headerRows:1,
           
          
          body: dataRow,
        },
      },
      {
        text: "Total HT :           " + this.tt_ht.toFixed(2),
        alignment: "right",
        fontSize: 15,
        bold: true,
        margin: [0, 25, 0, 0],
      },

      {
        text:
          "Total TVA :          " + this.tt_tva.toFixed(2),
        alignment: "right",
        fontSize: 15,
        bold: true,
      },

      {
        text:
          "Total TTC :          " + this.TTC.toFixed(2),
        alignment: "right",
        fontSize: 15,
        bold: true,
      },
    ],
    styles: {
      layout: {
       hLineColor : function(i,node) { return (i===1) ? '#71101f' : 'white';},
      },
      header: {
        fontSize: 30,
        bold: true,

        color: "firebrick",
        margin: [0, 15, 0, 0],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 40, 0, 0],
      },
      subheadere: {
        fontSize: 16,
        bold: true,
        margin: [0, 80, 0, 0],
      },
      tableExample: {
        
       hLineColor : function(i,node) { return (i===1) ? '#71101f' : 'white';},
        margin: [0, 30, 0, 15],
      },
      
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
        background:"red",
      },
    },
  };

  this.pdfObj = pdfMake.createPdf(docDefinition);
  // lors d'execution  dans une appareille mobile
  if (this.plt.is("cordova")) {
   
    this.pdfObj.getBuffer((buffer) => {
      var blob = new Blob([buffer], { type: 'application/pdf' });

      // Save the PDF to the data Directory of our App
      this.file.writeFile(this.file.externalDataDirectory, 'commande.pdf', blob, { replace: true }).then(fileEntry => {
        // Open the PDf with the correct OS tools
        this.fileOpener.open(this.file.externalDataDirectory + 'commande.pdf', 'application/pdf');
      })
    });
  } else {
    this.pdfObj.download();
  }
}


  /// afficher la liste des produits de la commande dans une modal
 async voirproduitsmodal(){
    
    
 
      const modal = await this.modalCtrl.create({
          component:ProduitsCommandPage,
          swipeToClose: true , 
          componentProps: {
           produits: this.cmdprods
          }
      });
  
      return await modal.present().then(_ => {
   console.log('Receive:',this.cmdprods);
      });
      
    }
  
    //Fermer la modal
  dismissModal() {
    this.modalCtrl.dismiss();
  }

}

