import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/models/api-response.model';
import {stock} from '../../models/stock'
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage'
@Injectable({
  providedIn: 'root'
})
export class StockService {


  prods : stock[]=[];
  private url= 'http://192.168.42.1/app/api/stock';
 
  constructor(private http:HttpClient,private storage:Storage) { }
  
  /**
   * récupération de la liste des stocks produits
   */
  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/stock';
     return this.http.get<stock[]>(url);
      }));
     

  }
/**
 * 
 * @param id récupération d'un produit du stock selon son id 
 */

  get(id: number){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/stock';
       return this.http.get<stock>(url + '/' + id);
      }));
  }
/**
 * 
 * @param stock ajout d'un produit 
 */
  create(stock: stock){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/stock';
      return this.http.post(url, stock);
      }));
  }

/**
 * 
 * @param stock modification du stock 
 * @param id 
 */
  update(stock:stock , id:string){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/stock';
      return this.http.put(url + '/' + id, stock);
      }));
  }
/**
 * 
 * 
 */
  remove (id:  string) {
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/stock';
        return this.http.delete<ApiResponse>(url + '/' + id);
      }));
  }
 
}
