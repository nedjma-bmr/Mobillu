import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livraison } from 'src/app/models/livraison.model';
import {Storage} from '@ionic/storage'
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LivraisonsService {

  private url= 'http://192.168.1.100:80/app/api/livraisons';
  private url2='http://192.168.1.100:80/app/api/clientLivraison';
  private url3= 'http://192.168.1.100:80/app/api/NumBons/numBonLivraison';
 private url4 = 'http://192.168.1.100:80/app/api/BonLivNonFacturer';
 

  constructor(private http:HttpClient,private storage:Storage) { }

  /**
   * récupération de la liste des bons de livraison
   */
  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/livraisons';
    return this.http.get<[Livraison]>(url);
      }));

  }



  /**
 * 
 * @param id récupération des bons de livraison selon l'id 
 */

get(id: string ){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/livraisons';
  return this.http.get<[Livraison]>(url + '/' + id);
    }));
}



/**
 * 
 * @param clientId récupération de la liste des bons de livraison selon l'id client 
 */
getListLivraisonByClientId(clientId : string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/clientLivraison';
  return this.http.get<[Livraison]>(url + '/' + clientId);
    }));
}


/**
   * 
   * @param bonLiv ajout d'un bon de livraison
   */
  create(bonLiv: Livraison ){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/livraisons';
    return this.http.post(url, bonLiv);
      }));
}


/**
 * recuperer le nouveau num de livraison à inserer 
 */
getNumBon(){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/NumBons/numBonLivraison';
  return this.http.get<[Livraison]>(url);
    }));

}
/**
 * mettre a jour le bon de livraison modifié 
 */

update(BonLiv:Livraison , id:string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/livraisons';
  return this.http.put(url + '/' + id, BonLiv);
    }));
}


/**
 * 
 * @param clientId récupération de la liste des bons de livraison selon l'id client 
 */
getListLivrNonFactByClientId(clientId : string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/BonLivNonFacturer';
  return this.http.get<[Livraison]>(url + '/' + clientId);
    }));
}

}
