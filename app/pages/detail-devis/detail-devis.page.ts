import { Component, OnInit , Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
 import { Devis } from 'src/app/models/devis.model';
 import { Platform } from '@ionic/angular';
 import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {Plugins , CameraResultType , CameraSource, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core'
import {DevisProduits} from 'src/app/models/devis-produits.model'
import { ProduitsDevisPage } from '../produits-devis/produits-devis.page';
import { DevisProduitsService } from 'src/app/services/devis-produits/devis-produits.service';
import { File } from '@ionic-native/file/ngx'


var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detail-devis',
  templateUrl: './detail-devis.page.html',
  styleUrls: ['./detail-devis.page.scss'],
})
export class DetailDevisPage implements OnInit {
  pdfObj= null ; 
  base64Image = null ;
  logoData = null ; 
  @Input() devisAfficher: Devis; // recevoir le devis envoyé 
  devisProd: DevisProduits[];
 
    constructor(private modalCtrl:ModalController,
      private  _devisProduitsService: DevisProduitsService,
      private plt : Platform ,
    private http: HttpClient , private fileOpener  : FileOpener,
    public file:File,
   ) { }
  
   ngOnInit() {
      /**
       * afficher la liste des produits d'un devis selon son id 
       */
    this._devisProduitsService.get(this.devisAfficher.id_proforma).subscribe(
      (listDevis =>{this.devisProd = listDevis ;
      
        this.devisProd.forEach(prod => {
          prod.prixttc = Number(prod.pvht) + (Number(prod.pvht) * (Number(prod.TVA)/100));
         prod.puht = Number(prod.prixttc * prod.qte) 
         
        })
      this.calculTotauxDevis(this.devisProd);
        
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
   * @param listDevisProduits 
   */
  calculTotauxDevis(listDevisProduits : DevisProduits[]){
    this.devisAfficher.totalTTC =0;
    this.devisAfficher.totalHT = 0;
    this.devisAfficher.totalTVA =0;
    this.devisAfficher.total=0;
    this.devisAfficher.Remise=0;
    this.devisAfficher.montantRemise=0;
    listDevisProduits.forEach(prod => {
      this.devisAfficher.totalTTC += Number(prod.puht);
      
      this.devisAfficher.totalHT += Number(prod.pvht * prod.qte);
      this.devisAfficher.Remise +=  Number(prod.remise);
     

    
      this.devisAfficher.total += Number (prod.puht) * (1- (Number (prod.remise/100)));
    })

    this.devisAfficher.totalTVA += (Number(this.devisAfficher.totalTTC) -  Number(this.devisAfficher.totalHT));
    this.devisAfficher.montantRemise += Number (this.devisAfficher.totalTTC -  this.devisAfficher.total);
    
    this.devisAfficher.totalTTC = Number(this.devisAfficher.totalTTC.toFixed(2));
  this.devisAfficher.totalHT = Number(this.devisAfficher.totalHT.toFixed(2));
  this.devisAfficher.totalTVA =Number(this.devisAfficher.totalTVA.toFixed(2));
  this.devisAfficher.total=Number(this.devisAfficher.total.toFixed(2));
  this.devisAfficher.Remise=Number(this.devisAfficher.Remise.toFixed(1));
  this.devisAfficher.montantRemise = Number(this.devisAfficher.montantRemise.toFixed(2));
  }

  

    /**
     * fermer la modal
     */
  dismissModal(){
    this.modalCtrl.dismiss();
  }



  /**
   * 
   * @param id afficher la liste des produits dans un devis dans la page produitDevis 
   * en passant en parametre cette liste 
   */
  async ProduitsDevis(id:string){
   
    
    const modal = await this.modalCtrl.create({
    component: ProduitsDevisPage,
    componentProps: {'devisProduits' : this.devisProd}, 
    swipeToClose: true , 
   
  });
  modal.onDidDismiss().then(()=>{ 
    
    this._devisProduitsService.get(this.devisAfficher.id_proforma).subscribe(
      listDevis =>{this.devisProd = listDevis ;
        this.devisProd.forEach(prod => {
          prod.prixttc = Number(prod.pvht) + (Number(prod.pvht) * (Number(prod.TVA)/100));
          prod.puht = Number(prod.prixttc * prod.qte) 
        })
        this.calculTotauxDevis(this.devisProd);
      });
 
    });
  
  return  await modal.present();
  }


  /**
   * télécharger le devis
   * 
   */

  /* buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column]);
        })

        body.push(dataRow);
    });

    return body;
}
  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      }
    };
  }  
  */
  DownloadPdf(){
    var moi = this.devisProd
    var dataRow = [];
    dataRow.push(['Désignation ', 'Quantité', 'Prix de vente', 'Prix ']);
    var bodyData = [];
        moi.forEach(function(sourceRow) {
      
     
      
        dataRow.push([sourceRow.design_prod ,sourceRow.qte , sourceRow.pvht
        , (sourceRow.pvht * sourceRow.qte).toFixed(2) ]);
    
      
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
    logo = {image: this.logoData , width: 100 , alignment : 'right',} ;
    const docDefinition = { 
      content : [
        {
          columns : [
           logo , 
            { 
              text : 'Devis' , style : 'header',
              alignment : 'right' 
            }
          ]
        } , 
        
        {
          columns :  [{
            width : '40%' , 
            text : 'Numéro Devis ',
            style : 'subheader'
          },
          {
            width : '40%', 
            text : 'Client',
            style : 'subheader'
          } , 
          {
            width : '40%', 
            text : 'Date',
            style : 'subheader'
          } 
         ]
        },
        {
         columns :  [{
           width : '40%' , 
           text : this.devisAfficher.num_proforma ,
           
           
           
         },
         {
           width : '40%', 
           text : this.devisAfficher.design_client,
           
         } ,
         {
          width : '40%', 
          text : this.devisAfficher.date_proforma,
          
        } 
        ]
       }, 
       {text: 'Détails du Devis : ', style: 'subheadere'},
         { 
          style : 'tableExample',
          table: {
           
            widths: [100, '*', 200, '*'],
            headerRows: 1,
         
             body : 
             
                dataRow
              
            }
          }, 
          { text: 'Total HT :           '+ this.devisAfficher.totalHT.toFixed(2), alignment: 'right' ,fontSize : 15,
          bold  : true , margin: [0, 25, 0, 0] },
          
           {text: 'Total TVA :          '+ this.devisAfficher.totalTVA.toFixed(2), alignment: 'right',fontSize : 15,
          bold  : true  },

          { text: 'Total TTC :          '+ this.devisAfficher.totalTTC.toFixed(2), alignment: 'right' ,fontSize : 15,
          bold  : true },
      ], 
      styles : {
        header : {
          fontSize : 30,
          bold  : true , 
         
          color : 'firebrick' ,
          margin : [0 ,15, 0, 0 ], 
          
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
        tableExample: {
          margin: [0, 30, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
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
   }
   else {
    this.pdfObj.download();
   }
 
  
   
   }

   
}

