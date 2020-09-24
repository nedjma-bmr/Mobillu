import { Injectable } from '@angular/core';
import { FactureProduits } from 'src/app/models/facture-produits.model';
import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage'
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FactureProduitsService {

 factureProd: FactureProduits[]


private url= 'http://192.168.1.100:80/app/api/factureProduits';
private url1 = 'http://192.168.1.100:80/app/api/factureProduitsList';
  constructor(private http:HttpClient,private storage:Storage) { }

  /**
 * 
 * @param factureProd ajout des produits à un bon de livraison 
 */

add(factureProd:FactureProduits[] ){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/factureProduitsList';
  return this.http.post(url , factureProd);
    }));
}


/**
 * 
 * @param id récupération des produits selon l'id devis 
 */

get(id: string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/factureProduits';
return this.http.get<[FactureProduits]>(url + '/' + id);
    }));
}
}
