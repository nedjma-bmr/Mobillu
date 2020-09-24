import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Livraison } from 'src/app/models/livraison.model';
import { LivraisonProduitsService } from 'src/app/services/livraison-produits/livraison-produits.service';
import { LivraisonProduits } from 'src/app/models/livraison-produits.model';
import { ProduitsLivraisonPage } from '../produits-livraison/produits-livraison.page';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { File} from '@ionic-native/file/ngx';
import { NavController } from '@ionic/angular';
import { FilesystemDirectory, FilesystemEncoding , Plugins } from '@capacitor/core';
import { StockService } from 'src/app/services/stock/stock';
import { Stock } from 'src/app/models/stock.model';
import { LivraisonsService } from 'src/app/services/livraisons/livraisons.service';
const {Filesystem} = Plugins ; 
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-detail-bon-livraison',
  templateUrl: './detail-bon-livraison.page.html',
  styleUrls: ['./detail-bon-livraison.page.scss'],
}) 
export class DetailBonLivraisonPage implements OnInit {

  pdfObj= null ; 
  base64Image = null ;
  logoData = null ; 
  @Input()  BonLivAfficher : Livraison ;
  LivraisonProd : LivraisonProduits[]

stockModel = new Stock()
  constructor(private modalCtrl: ModalController , 
    private _livraisonProduitsService : LivraisonProduitsService ,
    private plt : Platform ,
    private http: HttpClient , private fileOpener  : FileOpener ,
    public navCtrl: NavController, private file: File ,
    private alertController:  AlertController,
    private _stockService: StockService,
    private _livraison : LivraisonsService ,
    private alertCtrl: AlertController) { }

  ngOnInit() {

    this._livraisonProduitsService.get(this.BonLivAfficher.id_bonLiv).subscribe(
      (listProdLiv =>{this.LivraisonProd = listProdLiv ;
       
      
        this.LivraisonProd.forEach(prod => {
          prod.prixttc = Number(prod.pvht) + (Number(prod.pvht) * (Number(prod.TVA)/100));
         prod.puht = Number(prod.prixttc * prod.qte) 
         
        })

        this.calculTotauxDevis(this.LivraisonProd);
      }));

      /**
        * recuprer l'image à l'initialisation
        */
       this.loadLocalAssetToBase64();
      
  }


  /**
 * transférer l'image récupéré à base64 
 */
loadLocalAssetToBase64(){
  this.http.get('./assets/icon/logo.jpg', {responseType: 'blob'})
  .subscribe(res=>{
    const  reader = new  FileReader();
    reader.onloadend= () => {
      this.logoData = reader.result ; 
            }
          reader.readAsDataURL(res) 
             });
}



  /**
   * Calculer le montant du devis d'un client 
   * @param listLivraisonProduits 
   */
  calculTotauxDevis(listLivraisonProduits : LivraisonProduits[]){
    this.BonLivAfficher .totalTTC =0;
    this.BonLivAfficher .totalHT = 0;
    this.BonLivAfficher .totalTVA =0;
    this.BonLivAfficher .total=0;
    this.BonLivAfficher .Remise=0;
    this.BonLivAfficher .montantRemise=0;
    listLivraisonProduits .forEach(prod => {
      this.BonLivAfficher .totalTTC += Number(prod.puht);
      
      this.BonLivAfficher .totalHT += Number(prod.pvht * prod.qte);
      this.BonLivAfficher .Remise +=  Number(prod.remise);
     
 
    
      this.BonLivAfficher .total += Number (prod.puht) * (1- (Number (prod.remise/100)));
    })

    this.BonLivAfficher .totalTVA += (Number(this.BonLivAfficher .totalTTC) -  Number(this.BonLivAfficher .totalHT));
    this.BonLivAfficher .montantRemise += Number (this.BonLivAfficher .totalTTC -  this.BonLivAfficher .total);
    
    this.BonLivAfficher .totalTTC = Number(this.BonLivAfficher .totalTTC.toFixed(2));
  this.BonLivAfficher .totalHT = Number(this.BonLivAfficher .totalHT.toFixed(2));
  this.BonLivAfficher .totalTVA =Number(this.BonLivAfficher .totalTVA.toFixed(2));
  this.BonLivAfficher .total=Number(this.BonLivAfficher .total.toFixed(2));
  this.BonLivAfficher .Remise=Number(this.BonLivAfficher .Remise.toFixed(1));
  this.BonLivAfficher .montantRemise = Number(this.BonLivAfficher .montantRemise.toFixed(2));
  }

  
/**
 * Fermer la page 
 */
  closeModal (){
    this.modalCtrl.dismiss('Fermer'); 
  }


  /**
   * afficher les produits du bon de livraison séléctionné 
   * 
   */

  async ProduitsBonLivraison(id:string){
   
    
    const modal = await this.modalCtrl.create({
    component: ProduitsLivraisonPage,
    componentProps: {'livraisonProduits' : this.LivraisonProd}, 
    swipeToClose: true , 
   
  });
  modal.onDidDismiss().then(()=>{ 
    
    this._livraisonProduitsService.get(this.BonLivAfficher.id_bonLiv).subscribe(
      listProdLivraison =>{this.LivraisonProd = listProdLivraison ;
        this.LivraisonProd.forEach(prod => {
          prod.prixttc = Number(prod.pvht) + (Number(prod.pvht) * (Number(prod.TVA)/100));
          prod.puht = Number(prod.prixttc * prod.qte) 
        })
        this.calculTotauxDevis(this.LivraisonProd);
      });
 
    });
  
  return  await modal.present();
  }




  /**
   * teelcharger le bon de livraison
   */

  DownloadPdf(){
    var moi = this.LivraisonProd
    var dataRow = [];
    dataRow.push(['Désignation ', 'Quantité', 'Prix de vente', 'Tva', 'Remise','Prix  Total']);
    var bodyData = [];
        moi.forEach(function(sourceRow) {
      
     
      
        dataRow.push([sourceRow.design_prod ,sourceRow.qte , sourceRow.pvht
        , sourceRow.TVA , sourceRow.remise, (sourceRow.puht* (1- (Number (sourceRow.remise/100)))).toFixed(2)]);
    
       // (sourceRow.pvht * sourceRow.qte).toFixed(2) ]) ,
    /*  dataRow.push(sourceRow.design_prod)
      dataRow.push(sourceRow.qte)
      dataRow.push(sourceRow.pvht)
      dataRow.push((sourceRow.pvht * sourceRow.qte).toFixed(2))
*/
     
        });

        
  /* for (var i=0 ; i<moi.length; i++) {
     bodyData.push({
      ID: moi[i].code_prod, 
      Designation: moi[i].design_prod, 
      Amount: moi[i].qte, 
      Price: moi[i].pvht, 
     });
   
   */
    let logo = {}
    logo = {image: this.logoData , width: 110 , alignment : 'right',} ;
    const docDefinition = { 
      content : [
        {
          columns : [
           logo , 
            { 
              text : 'Bon De Livraison' , style : 'header',
              alignment : 'right' 
            },

            {
              text : 'Fait le : ' +this.BonLivAfficher.date_bonLiv , style : 'date' , 
              alignment : 'right'
            }
          ]
        } , 
        
        {
          columns :  [{
            width : '50%' , 
            text : 'Bon N° :  ',
            style : 'subheader'
          },
          {
            width : '50%', 
            text : 'Client',
            style : 'subheader'
          } , 
          
         ]
        },
        {
         columns :  [{
           width : '50%' , 
           text : this.BonLivAfficher .num_bonLiv,
           
           
           
         },
         {
           width : '50%', 
           text : this.BonLivAfficher .design_client,
           
         } ,
         
        ]
       }, 
       {text: 'Détails du Bon de Livraison : ', style: 'subheadere'},
         { 
          style : 'tableExample',
          table: {
           
            widths: [110, 60, 100, 50,50,80],
            headerRows: 1,
            heights: 20,
             body : 
             
                dataRow
              
            }
          }, 
          { text: 'Total HT  :           '+ this.BonLivAfficher .totalHT.toFixed(2), alignment: 'right' ,fontSize : 15,
          bold  : true , margin: [0, 25, 0, 0] },
          
           {text: 'Total TVA :            '+ this.BonLivAfficher .totalTVA.toFixed(2), alignment: 'right',fontSize : 15,
          bold  : true  },

          { text: 'Total TTC :          '+ this.BonLivAfficher .totalTTC.toFixed(2), alignment: 'right' ,fontSize : 15,
          bold  : true },

          { 
            style : 'Total',
            table: {
              heights: 40,
              widths: [75 , 80],
              alignment : 'right',
             
               body : [
              
                 [ { 	fillColor: '#eeeeee', text: 'Total   : '  , style: 'textTotal',  } , {text : this.BonLivAfficher.total+'DA' , style : 'montantTotal'} ] 
                ]
              }
            }, 
      ], 
      styles : {
        header : {
          fontSize : 25,
          bold  : true , 
         
          color : 'firebrick' ,
          margin : [10 ,90,-15, 0 ], 
          
        }, 
        subheader : {
          fontSize : 14 ,
          bold : true , 
          margin : [0 ,40, 0, 0 ], 
         
        },
        subheadere: {
          fontSize: 16,
          bold: true,
          margin: [0, 80, 0, 0]
        },
        date : {
         margin : [0, 35, 0, 0] , 
         fontSize: 20,
          

        },
        tableExample: {
          margin: [0, 30, 0, 15]
        },
        Total : {
         margin : [350,50,0,50] , 
         
        },
        textTotal : {
          bold: true,
          fontSize: 16,
          color: 'firebrick' ,
          alignment : 'center' ,
          margin : [0,10,0,0]
        },
        montantTotal : {
          bold: true,
          fontSize: 16,
          color: 'black' ,
          alignment : 'center' ,
          margin : [0,10,0,0]
        }, 
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black' , 
          
        }
      }
    
   } 
 
   
   this.pdfObj = pdfMake.createPdf(docDefinition) ; 
   if (this.plt.is('cordova')){

    this.pdfObj.getBuffer((buffer) => {
      var blob = new Blob([buffer], { type: 'application/pdf' });

      // Save the PDF to the data Directory of our App
      this.file.writeFile(this.file.externalDataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
        // Open the PDf with the correct OS tools
        this.fileOpener.open(this.file.externalDataDirectory + 'myletter.pdf', 'application/pdf');
      })
    });
  
   
  } else {
    this.pdfObj.download();
   }
  }

  /**
   * valider Bon de livraison 
   */

  async ValiderBonLivraison(){
   

  }
}
