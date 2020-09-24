import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { produit } from 'src/app/models/produit.model';
import { famille } from 'src/app/models/famille.model';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FamilleService {

 
  private url= 'http://192.168.42.1:8080/app/api/famille';


  constructor(private http:HttpClient,private storage:Storage) { }
  
  /**
   * récupération de la liste des familles
   */
  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/famille';
    return this.http.get<[famille]>(url);
      }));

  }

 /**
  * 
  * @param code_fam recupération d'une famille selon le code_fam
  */
  get(code_fam:number){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/famille';
       return this.http.get<famille>(url + '/' + code_fam);
      }));
  }

  
}