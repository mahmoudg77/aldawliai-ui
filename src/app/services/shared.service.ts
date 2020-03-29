import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  error(message: string){
    alert(message);
  }
  success(message: string){
    alert(message);
  }

  constructor(
    private inappbrowser:InAppBrowser,
    private platform:Platform,

  ) { }

  async presentLoading() {
    const loadingController = document.querySelector('ion-loading-controller');
    await loadingController.componentOnReady();
  
    const loadingElement = await loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000
    });
    return await loadingElement.present();
  }

  openWebSite(url:string){
    //console.log(url);
    if(this.platform.is("android")||this.platform.is("ios")){
      this.inappbrowser.create(url,"_blank").show();
    }else{
      window.open(url);
    }
  }

}
