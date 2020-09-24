import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock/stock';
import { stock } from 'src/app/models/stock';
import { ProduitsService } from 'src/app/services/produits/produits.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {
  stocks:stock[]=[];
  constructor(private stockSer:StockService,
    private prodS:ProduitsService) { }

    //executé lors du chargement de la page
  ngOnInit() {
    this.stockSer.getAll().subscribe((proS)=>{
       this.stocks = proS; 
     console.log(this.stocks);

    } )
 
    
  }

}
