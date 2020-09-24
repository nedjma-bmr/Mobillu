import { Component} from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerConfigPage } from '../server-config/server-config.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  //l'identifiant de l'utilisateur
  username:string;
  //le mot de passe de l'utilisateur
  password:string;
  //l'erreur d'authentification
  error:string;
  //permet d'afficher le mot de passe
  showPassword=false;
// icone du mot de passe 
  passwordToggleIcon='eye';
  
  //formulaire d'authentification
  form = new FormGroup({
    username: new FormControl('',[
      Validators.required,
     

    ]),
    password: new FormControl('',[
      Validators.required,
      
    ]),

  });



  constructor(public navCrtl:NavController,
    private loginService:LoginService,
    private alertCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private router:Router,
    ) { }

  /**
   * permet d'afficher ou masquer le mot de passe
   */
  togglePassword(){
    this.showPassword=!this.showPassword ;
    if(this.passwordToggleIcon=='eye'){
      this.passwordToggleIcon='eye-off';
     } else{
      this.passwordToggleIcon='eye';
      }
    }
    


 
 /**
  * authentification de l'utilisateur
  */
 async login() {
  
    const loading = await this.loadingCtrl.create({message:'Connexion ...'});
    await loading.present();
    this.loginService.login(this.form.value).subscribe (
      async token => { 
        localStorage.setItem('token' , token);
        loading.dismiss();
        this.router.navigateByUrl('/devis');
        
      },
      async ()=> {
        const alert = await this.alertCtrl.create({message :'Connexion échoué ' , buttons:[{
          text : 'OK'}]});
        await alert.present();
        loading.dismiss();
      }
    );
   
    
    
  }

  /**
   * Ouvrir la page de la configuration du serveur
   */
  goToConfigServer(){
    this.navCrtl.navigateRoot(['server-config']) ;
    }
}
