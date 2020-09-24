import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModePaiment } from 'src/app/models/mode_paiment.model';
import {Storage} from '@ionic/storage'
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModePaimentService {


 // private url= 'http://192.168.1.100:80/app/api/modePaiment';


  constructor(private http:HttpClient,private storage:Storage) { }

  /**
   * récupération de la liste des mode de paiments
   */
  getAll(){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/modePaiment';
    return this.http.get<[ModePaiment]>(url);
      }));

  }
}
