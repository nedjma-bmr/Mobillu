import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ServerConfigService } from 'src/app/services/server-config/server-config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-config',
  templateUrl: './server-config.page.html',
  styleUrls: ['./server-config.page.scss'],
})
export class ServerConfigPage implements OnInit {
  adressip: string;
    
  public data;

  constructor(public navCtrl:NavController,
    public alertCtrl:AlertController,
    private serverApi: ServerConfigService,
    private router:Router) { }

  ngOnInit() {
  }

  /**
   * 
   * changer l'adresse ip du serveur
   */
  async setInfo($adressip) {
    console.log(this.serverApi.adressip);

    this.serverApi.setSever($adressip);
  
    let alert = this.alertCtrl.create({
      header: "Information",
      subHeader: 'Configuration terminée',
      buttons: [
        { text: 'OK',
          handler: () => { 
            this.back_go() ; 
           }
        },
      ]
    });
    (await alert).present();
  }

  back_go(){	
    this.router.navigateByUrl('/login');
    }
}
