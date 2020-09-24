import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { produit } from 'src/app/models/produit.model';
import { DevisProduits } from 'src/app/models/devis-produits.model';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage'


@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  
  private url= 'http://192.168.42.1/app/api/produit';
  items : produit[]=[];

  constructor(private http:HttpClient,private storage:Storage) { }
  
  /**
   * récupération de la liste des produits
   */
  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/produit';
    return this.http.get<[produit]>(url);
      }));

  }

// recupération d'un produit selon l'id 
  get(id: string){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/produit';
       return this.http.get<[produit]>(url + '/' + id);
      }));
  }

  get2(id: string){ 
   
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/produit';
     return this.http.get<[produit]>(url);
      }));
}
}
