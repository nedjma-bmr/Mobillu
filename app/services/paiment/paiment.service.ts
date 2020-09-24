import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paiment } from 'src/app/models/paiment.model';
import {Storage} from '@ionic/storage'
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaimentService {
  //private url= 'http://192.168.1.100:80/app/api/paiment';


  constructor(private http:HttpClient,private storage:Storage) { }

/**
   * 
   * @param paiment ajout d'un paiment
   */
  create(paiment: Paiment ){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/modePaiment';
    return this.http.post(url, paiment);
      }));
}


}
