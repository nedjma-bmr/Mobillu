import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facture } from 'src/app/models/facture.model';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import {Storage} from '@ionic/storage'

 
@Injectable({
  providedIn: 'root'
})
export class FacturesService {

  private url3= 'http://192.168.1.100:80/app/api/NumBons/numFacture';
  private url= 'http://192.168.1.100:80/app/api/factures';
  private url2='http://192.168.1.100:80/app/api/clientFacture';
  constructor(private http:HttpClient,private storage:Storage) { }

  /**
   * récupération de la liste des bons de Facture
   */
  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/factures';
    return this.http.get<[Facture]>(url);
      }));

  }



  /**
 * 
 * @param id récupération des bons de Facture selon l'id 
 */

get(id: string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/factures';
  return this.http.get<[Facture]>(url + '/' + id);
    }));
}



/**
 * 
 * @param clientId récupération de la liste des bons de Facture selon l'id client 
 */
getListFactureByClientId(clientId : string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/clientFacture';
  return this.http.get<[Facture]>(url + '/' + clientId);
    }));
}


/**
   * 
   * @param bonFact ajout d'un bon de Facture
   */
  create(bonFact: Facture ){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/factures';
    return this.http.post(url, bonFact);
      }));
}

/**
 * recuperer le nouveau num de facture à inserer 
 */
getNumBon(){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/NumBons/numFacture';
  return this.http.get<[Facture]>(url);
    }));

}

/**
 * mettre a jour facture modifié 
 */

update(Fact:Facture , id:string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/factures';
  return this.http.put(url + '/' + id, Fact);
    }));
}

}
 