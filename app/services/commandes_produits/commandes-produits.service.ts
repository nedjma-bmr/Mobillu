import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommandProduits } from 'src/app/models/commande-produit.model';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Storage} from '@ionic/storage';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

 @Injectable({
  providedIn: 'root'
})
export class CommandesProduitsService {
  adressIp

  private url:string;
  private url1:string;
  
  /*
  private url= 'http://192.168.42.1:8080/app/api/commandes_produits';
  
  private url1 = 'http://192.168.42.1:8080/app/api/CmdproduitsList';
*/
  constructor(private http:HttpClient,private storage:Storage) { 
    this.storage.get('ip_adr').then((val)=>{
     this.url=val+'/commandes_produits' ;
     this.url1 = val+'/CmdproduitsList';
    })
  }

  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/commandes_produits';
      return this.http.get<[CommandProduits]>(url);
    }));
    
  }
  
  create(cmdprod:CommandProduits){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/commandes_produits';
       return  this.http.post<[CommandProduits]>(url , cmdprod);
      }));
  }
  
  get(id: number){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/commandes_produits';
    return this.http.get<[CommandProduits]>(url + '/' + id);  
      }));
}


update(cmdProd:CommandProduits[] ){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url1= val+'/CmdproduitsList';
  return this.http.put(url1  , cmdProd);
    }));
}
remove(id:string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/commandes_produits';
  return this.http.delete<ApiResponse>(url + '/' + id);
    }));
}

add(cmdProd:CommandProduits[] ){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/commandes_produits';
  return this.http.post(url  , cmdProd);
    }));
}
}
