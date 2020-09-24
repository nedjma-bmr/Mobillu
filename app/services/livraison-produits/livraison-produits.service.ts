import { Injectable } from '@angular/core';
import { DevisProduits } from 'src/app/models/devis-produits.model';
import { HttpClient } from '@angular/common/http';
import { LivraisonProduits } from 'src/app/models/livraison-produits.model';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Storage} from '@ionic/storage'
@Injectable({
  providedIn: 'root'
})
export class LivraisonProduitsService {


livraisonProd: LivraisonProduits[]

private url1 = 'http://192.168.1.100:80/app/api/livraisonProduitsList';
private url= 'http://192.168.1.100:80/app/api/livraisonProduits';

  constructor(private http:HttpClient,private storage:Storage) { }
  
/**
 * 
 * @param livraisonProd ajout des produits à un bon de livraison 
 */

  add(livraisonProd:LivraisonProduits[] ){
    return from ( this.storage.get('ip_adr')).pipe(
      switchMap(val => {
      var url= val+'/livraisonProduitsList';
    return this.http.post(url  , livraisonProd);
      }));
  }


  /**
   * 
   * @param id récupération des produits selon l'id bon de livraison 
   */

get(id: string){
  return from ( this.storage.get('ip_adr')).pipe(
    switchMap(val => {
    var url= val+'/livraisonProduits';
  return this.http.get<[LivraisonProduits]>(url + '/' + id);
    }));
}

}
