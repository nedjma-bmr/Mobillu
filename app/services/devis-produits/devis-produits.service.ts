import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DevisProduits} from 'src/app/models/devis-produits.model'
import { ProduitsDevisPage } from 'src/app/pages/produits-devis/produits-devis.page';
import { BehaviorSubject, from } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.model';
import {Storage} from '@ionic/storage'
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DevisProduitsService {

  
  devisProd : DevisProduits[];
  private url= 'http://192.168.42.1:8080/app/api/devisProduits';
  private url1 = 'http://192.168.42.1:8080/app/api/devisProduitsList';
  
  constructor(private http:HttpClient,private storage:Storage) { }

  /**
   * récupération de la liste des devis produits 
   */
  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/devisProduits';
    return this.http.get<[DevisProduits]>(url);
      }));
  }

  /**
   * 
   * @param id récupération des produits selon l'id devis 
   */

get(id: string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/devisProduits';
    return this.http.get<[DevisProduits]>(url + '/' + id);
    }));
}



/**
 * 
 * @param devisProd mise à jour de la table devisProduits
 */
update(devisProd:DevisProduits[] ){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url1= val+'/devisProduitsList';
  return this.http.put(url1  , devisProd);
    }));
}


/**
 * 
 * @param devisProd ajout des produits à un devis 
 */

add(devisProd:DevisProduits[] ){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url1= val+'/devisProduitsList';
  return this.http.post(url1  , devisProd);
    }));
}

/**
 * suppression des produits dans un devis 
 */

remove (id:  string) {
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/devisProduits';
  return this.http.delete<ApiResponse>(url + '/' + id);
    }));
}





}

