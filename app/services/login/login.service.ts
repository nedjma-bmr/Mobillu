import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {map, switchMap} from'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url='http://192.168.42.1/app/api';

  constructor(private http:HttpClient,private storage:Storage) { }

// envoie les infos d'authentification et récuperer le token 

  login(credentials:User): Observable<string>{
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/login';
    return this.http.post<{token : string}>(url, credentials).pipe(
      map(response=> response.token)
    );
      }));
  }
}
