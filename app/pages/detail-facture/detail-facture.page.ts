import { Component, OnInit, Input } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Facture } from 'src/app/models/facture.model';
import { FactureProduits } from 'src/app/models/facture-produits.model';
import { FactureProduitsService } from 'src/app/services/facture-produits/facture-produits.service';
import { ProduitsFacturePage } from '../produits-facture/produits-facture.page';
import { FacturesService } from 'src/app/services/factures/factures.service';
import { PaimentFacturePage } from '../paiment-facture/paiment-facture.page';
import { File} from '@ionic-native/file/ngx';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-detail-facture',
  templateUrl: './detail-facture.page.html',
  styleUrls: ['./detail-facture.page.scss'],
})
export class DetailFacturePage implements OnInit {

  pdfObj= null ; 
  base64Image = null ;
  logoData = null ; 
  @Input()  FactureAfficher : Facture ;
  FactureProd : FactureProduits[] ; 


  constructor(private modalCtrl: ModalController , 
    private _factureProduitsService : FactureProduitsService ,
    private plt : Platform ,
    private http: HttpClient , private fileOpener  : FileOpener , 
    private _factureService : FacturesService ,
    private file: File ) { }
 
  ngOnInit() {

    
    this._factureProduitsService.get(this.FactureAfficher.id_Fact).subscribe(
      (listProdLiv =>{this.FactureProd = listProdLiv ;
       
      
        this.FactureProd.forEach(prod => {
          prod.prixttc = Number(prod.pvht) + (Number(prod.pvht) * (Number(prod.TVA)/100));
         prod.puht = Number(prod.prixttc * prod.qte) 
         
        })

        this.calculTotauxDevis(this.FactureProd);
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
   * @param istFactureProduits
   */
  calculTotauxDevis(listFactureProduits : FactureProduits[]){
    this.FactureAfficher .totalTTC =0;
    this.FactureAfficher .totalHT = 0;
    this.FactureAfficher .totalTVA =0;
    this.FactureAfficher .total=0;
    this.FactureAfficher .Remise=0;
    this.FactureAfficher .montantRemise=0;
    listFactureProduits .forEach(prod => {
      this.FactureAfficher .totalTTC += Number(prod.puht);
      
      this.FactureAfficher .totalHT += Number(prod.pvht * prod.qte);
      this.FactureAfficher .Remise +=  Number(prod.remise);
     
 
    
      this.FactureAfficher .total += Number (prod.puht) * (1- (Number (prod.remise/100)));
    })

    this.FactureAfficher .totalTVA += (Number(this.FactureAfficher .totalTTC) -  Number(this.FactureAfficher .totalHT));
    this.FactureAfficher .montantRemise += Number (this.FactureAfficher .totalTTC -  this.FactureAfficher .total);
    
    this.FactureAfficher .totalTTC = Number(this.FactureAfficher .totalTTC.toFixed(2));
  this.FactureAfficher .totalHT = Number(this.FactureAfficher .totalHT.toFixed(2));
  this.FactureAfficher .totalTVA =Number(this.FactureAfficher .totalTVA.toFixed(2));
  this.FactureAfficher .total=Number(this.FactureAfficher .total.toFixed(2));
  this.FactureAfficher .Remise=Number(this.FactureAfficher .Remise.toFixed(1));
  this.FactureAfficher .montantRemise = Number(this.FactureAfficher .montantRemise.toFixed(2));
  
  }


/**
   * afficher les produits du bon de livraison séléctionné 
   * 
   */

  async ProduitsFacture(id:string){
   
    
    const modal = await this.modalCtrl.create({
    component: ProduitsFacturePage,
    componentProps: {'factureProduits' : this.FactureProd}, 
    swipeToClose: true , 
   
  });
  modal.onDidDismiss().then(()=>{ 
    
    this._factureProduitsService.get(this.FactureAfficher.id_Fact).subscribe(
      listProdFact =>{this.FactureProd = listProdFact ;
        this.FactureProd.forEach(prod => {
          prod.prixttc = Number(prod.pvht) + (Number(prod.pvht) * (Number(prod.TVA)/100));
          prod.puht = Number(prod.prixttc * prod.qte) 
        })
        this.calculTotauxDevis(this.FactureProd);
      });
 
    });
  
  return  await modal.present();
  }




  /**
   * paiment de la facture 
   */

  async PaimentFacture(id){
    const modal = await this.modalCtrl.create({
      component: PaimentFacturePage,
      componentProps: {'detailFacture' : this.FactureAfficher }, 
      swipeToClose: true , 
     
    }); 
    modal.onDidDismiss().then(dataReturned=>{

if(dataReturned.data!=='fermé'){
  this.FactureAfficher.reste_du = dataReturned.data
} 
     })
    return  await modal.present();
  }





  /**
   * teelcharger la facture 
   */

  DownloadPdf(){
    var moi = this.FactureProd
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
              text : 'Fait le : ' +this.FactureAfficher.date_Fact , style : 'date' , 
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
           text : this.FactureAfficher .num_Fact,
           
           
           
         },
         {
           width : '50%', 
           text : this.FactureAfficher .design_client,
           
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
          { text: 'Total HT  :           '+ this.FactureAfficher .totalHT.toFixed(2), alignment: 'right' ,fontSize : 15,
          bold  : true , margin: [0, 25, 0, 0] },
          
           {text: 'Total TVA :            '+ this.FactureAfficher .totalTVA.toFixed(2), alignment: 'right',fontSize : 15,
          bold  : true  },

          { text: 'Total TTC :          '+ this.FactureAfficher .totalTTC.toFixed(2), alignment: 'right' ,fontSize : 15,
          bold  : true },

          { 
            style : 'Total',
            table: {
              heights: 40,
              widths: [75 , 80],
              alignment : 'right',
             
               body : [
              
                 [ { 	fillColor: '#eeeeee', text: 'Total   : '  , style: 'textTotal',  } , {text : this.FactureAfficher.total+'DA' , style : 'montantTotal'} ] 
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
    
   }
   else {
    this.pdfObj.download();
   }
  }


/**
 * Fermer la page 
 */
closeModal (){
  this.modalCtrl.dismiss('fermer') ;
}
}
