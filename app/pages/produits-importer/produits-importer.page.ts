import { Component, OnInit, Input } from '@angular/core';
import { DevisService } from 'src/app/services/devis/devis.service';
import { DevisProduitsService } from 'src/app/services/devis-produits/devis-produits.service';
import { DevisProduits } from 'src/app/models/devis-produits.model';
import { ProduitsService } from 'src/app/services/produits/produits.service';
import { produit } from 'src/app/models/produit.model';
import { ModalController } from '@ionic/angular';
import { commande } from 'src/app/models/commande.model';
import { CommandesService } from 'src/app/services/commandes/commandes.service';
import { CommandProduits } from 'src/app/models/commande-produit.model';
import { CommandesProduitsService } from 'src/app/services/commandes_produits/commandes-produits.service';

@Component({
  selector: 'app-produits-importer',
  templateUrl: './produits-importer.page.html',
  styleUrls: ['./produits-importer.page.scss'],
})
export class ProduitsImporterPage implements OnInit {
@Input() idDevisImporter:string;
@Input() num:number;
@Input() idClientDevisImporter: string;
today=new Date();
cmd= new commande();
cmdProd = new CommandProduits();
devisProduits:DevisProduits[];
Produits:produit[]=[];
  constructor(private devisPSer:DevisProduitsService,
    private prodSer:ProduitsService,
    private modalCtrl:ModalController,
    private cmdSer : CommandesService,
    private cmdProdSer : CommandesProduitsService,) { }

  ngOnInit() {
    // récuperer le devis son id qui choisis dans la page précedente
    this.devisPSer.get(this.idDevisImporter).subscribe((devisP)=>{
         this.devisProduits= devisP;
         for(let devis of this.devisProduits){
           devis.prixttc= Number (devis.pvht) + Number (devis.TVA/100 * devis.pvht); 
         }
        
    })
  }


   
  /* 
  Enregister les produits du devis dans nouvelle commande
  */
importer(){
  this.cmd.NumCmd = this.num ;
  this.cmd.date = this.today ;
  this.cmd.id_client = this.idClientDevisImporter ;

  this.cmdSer.create(this.cmd).subscribe((cmd)=>{
    console.log(cmd);
  })
  
  for(let i=0;i<this.devisProduits.length;i++){

  this.cmdProd.Num_cmd = this.num ;
  this.cmdProd.id_produit = this.devisProduits[i].id_prod;
  this.cmdProd.design_prod = this.devisProduits[i].design_prod;
  this.cmdProd.qte = this.devisProduits[i].qte;
  this.cmdProd.puht = this.devisProduits[i].puht;
  this.cmdProd.remise = this.devisProduits[i].remise;
   this.cmdProdSer.create(this.cmdProd).subscribe((j)=>{
     console.log(j);
     console.log("réussis")
   })
  

  }
  this.modalCtrl.dismiss('created');
  
}

   /**
   * fermer la page 
   */
  dismissModal(){

    this.modalCtrl.dismiss('created') ;
    
    
  }
}
