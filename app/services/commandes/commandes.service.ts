import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/models/api-response.model';
import { commande } from 'src/app/models/commande.model';
import { ServerConfigService } from '../server-config/server-config.service';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  adressIp

  /*
private url= 'http://192.168.42.1/app/api/commande';
  private url2= 'http://192.168.42.1/app/api/clientCmd';
*/
  constructor(private http:HttpClient,private serviceConf:ServerConfigService,private storage:Storage ) { 
  }

  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/commande';
      return this.http.get<[commande]>(url);
    }));
    
    

  }


  get(id: number){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/commande';
       return this.http.get<commande>(url + '/' + id);
      }));
  }

  
  create(commande: commande){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/commande';
    return this.http.post(url, commande);
      }));
}

update(commande:commande ,NumCmd:number){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/commande';
  return this.http.put(url + '/' + NumCmd, commande);
    }));
}

remove (id:number) {
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/commande';
      return this.http.delete<ApiResponse>(url + '/' + id);
    }));
}

getListCmdByClientId(clientId : string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url2= val+'/clientCmd';
  return this.http.get<[commande]>(url2 + '/' + clientId);
    }));
}


}

