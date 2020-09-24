import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { File } from '@ionic-native/file/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjouterModifierClientPage } from './pages/ajouter-modifier-client/ajouter-modifier-client.page';
import { IonicStorageModule} from '@ionic/storage'
import { IonicSelectableModule } from 'ionic-selectable';
import { AjoutProduitPage } from './pages/ajout-produit/ajout-produit/ajout-produit.page';


@NgModule({
  declarations: [AppComponent , AjouterModifierClientPage,AjoutProduitPage],
  entryComponents: [AjouterModifierClientPage,AjoutProduitPage],
  imports: [BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule,HttpClientModule,
    FormsModule,ReactiveFormsModule,IonicSelectableModule ],
  providers: [
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    FileOpener,
    File,
    SplashScreen,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
