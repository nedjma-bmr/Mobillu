import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Devis } from 'src/app/models/devis.model';

import { ApiResponse } from 'src/app/models/api-response.model';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  private url= 'http://192.168.42.1/app/api/devis';
  private url2='http://192.168.42.1/app/api/clientDevis';
  private url3= 'http://192.168.42.1/app/api/NumBons/numBonDevis';
 

  constructor(private http:HttpClient,private storage:Storage) { }

  /**
   * récupération de la liste des devis
   */
  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/devis';
    return this.http.get<[Devis]>(url);
      }));
  }
/**
 * 
 * @param id récupération des devis selon l'id 
 */

  get(id: string){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/devis';
       return this.http.get<[Devis]>(url + '/' + id);
      }));
  }

/**
 * 
 * @param clientId récupération de la liste des devis selon l'id client 
 */
  getListDevisByClientId(clientId : string){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url2= val+'/clientDevis';
    return this.http.get<[Devis]>(url2 + '/' + clientId);
      }));
  }

  /**
   * 
   * @param devis ajout d'un devis 
   */
  create(devis: Devis){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/devis';
    return this.http.post(this.url, devis);
      }));
}


/**
 * 
 * @param id suppression d'un devis selon son id 
 */
remove (id:  string) {
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/devis';
  return this.http.delete<ApiResponse>(url + '/' + id);
    }));
}

/**
 * recuperer le nouveau num de devis à inserer 
 */
getNumBon(){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url3= val+'/NumBons/numBonDevis';
  return this.http.get<[Devis]>(url3);
    }));

}


/**
 * 
 * @param devis modification d'un devis
 * @param id 
 */
update(devis:Devis , id:string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/devis';
  return this.http.put(url + '/' + id, devis);
    }));
}
 
}

