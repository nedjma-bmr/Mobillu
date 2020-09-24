import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ville } from 'src/app/models/ville.model';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class VillesService {

  private url= 'http://192.168.42.1:8080/app/api/villes';
  


  constructor(private http:HttpClient,private storage:Storage) { }

  /**
   * récupération de la liste des villes
   */
  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/villes';
    return this.http.get<[Ville]>(url);
      }));

  }


  

}
