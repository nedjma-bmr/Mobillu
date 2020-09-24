import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/models/client.model';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

adressIp

 private url:string;
  design: string;
  private currentClientId:string;
  constructor(private http:HttpClient,private storage:Storage) { 
    this.storage.get('ip_adr').then((val)=>{
      this.url = val+'/clients';

    })
  }
  
  /**
   * récupération de la liste des clients
   */
  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/clients';
    return this.http.get<[Client]>(url);
      }));
  }
/**
 * 
 * @param id récupération d'un client selon son id 
 */

  get(id: string){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/clients';
       return this.http.get<Client>(url + '/' + id);
      }));
  }
/**
 * 
 * @param client ajout d'un client 
 */
  create(client: Client){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/clients';
      return this.http.post(url, client);
      }));
  }

/**
 * 
 * @param client modification d'un client 
 * @param id 
 */
  update(client:Client , id:string){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/clients';
      return this.http.put(url + '/' + id, client);
      }));
  }
/**
 * 
 * @param id suppression d'un client selon son id 
 */
  remove (id:  string) {
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/clients';
        return this.http.delete<ApiResponse>(url + '/' + id);
      }));
  }
/**
 * 
 * @param clientId initialisation du client courant 
 */
 setCurrentClientId(clientId : string){
   this.currentClientId = clientId;
 }

 /**
  * récupération du client courant 
  */
 getCurrentClientId(){
   return this.currentClientId;
 }

 emptyCurrentClientId(){
   this.currentClientId = "";
 }

 getDesigntation(id:string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/clients';
  this.http.get<Client>(url + '/' + id).subscribe((client)=>{
       this.design = client.design_client;
  });
  return this.design ;
}));
}
}
