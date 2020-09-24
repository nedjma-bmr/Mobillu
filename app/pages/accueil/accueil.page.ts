import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage {

  constructor(private ac:AlertController,
    public toastController: ToastController,
    public http: HttpClient,
    public loadingController: LoadingController,
    private router : Router) {
      
    } 

    gestionClient(){
      this.router.navigateByUrl('/clients')
    }

    Produits(){
      this.router.navigateByUrl('/produits')

    }

    GestionVentes(){
      this.router.navigateByUrl('/devis')
    }
  }


