import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class ServerConfigService {
  SERVER = "http://192.168.42.1/app/api";
  adressip;

  constructor(  public alertCtrl: AlertController ,  public storage: Storage) { 
     this.storage.get('ip').then((val) => {
      this.adressip = val;
    });
    }

 
 
  setSever($value_ip):any{
    //recuperer
    if($value_ip!= null && $value_ip!= undefined){
      this.SERVER = "https://"+$value_ip+"/app/api";
    }
    
    //garde en storage ou bdd
    // set a key/value
    this.storage.set('ip_adr', this.SERVER);
     this.storage.set('ip', $value_ip);
  }

 
}
