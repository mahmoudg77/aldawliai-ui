import { FCM } from '@ionic-native/fcm/ngx';
import { Market } from '@ionic-native/market/ngx';
import { AuthService } from './services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, AlertController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
//import { Firebase } from '@ionic-native/firebase/ngx';
import { AppSettingsService } from './services/bll/app-settings.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})

export class AppComponent  {
  app_version:string;
  force_update:string;
  version:string;
  id:string="com.webegy.aldawlia";
  @ViewChild(IonRouterOutlet,{static:false}) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth:AuthService,
    private router:Router,
    //private fb:Firebase,
    private settings:AppSettingsService,
    private appVersion:AppVersion,
    private dialogs:AlertController,
    private market:Market,
    private fcm: FCM,
    private location:Location,
  ) {
    this.initializeApp();
    
    appVersion.getPackageName().then(id=>{
      console.log(this.id);
      this.id=id;
    }).catch(err=>{
      
      console.log(err);
    })

    

    this.settings.getSettings("app_version",'1.0.8',
    next=>{
           this.app_version =next;

           this.settings.getSettings("force_update",'0',
           next=>{
            
                  this.force_update =next;
                  appVersion.getVersionNumber().then((ver:string)=>{
                    this.version=ver;
                    if(this.version!=this.app_version){
                      this.showDialog();
                    }
                  });
           });
       
    });
    platform.backButton.subscribe((d)=>{
    // console.log(router.url);
    if(router.url=="/client/home" || router.url=="/user/home"){
        navigator['app'].exitApp();
    } 
    return false;
 })
   
  }

 async showDialog(){

  const alert=await  this.dialogs.create({
    header: 'تحديث جديد',
    //subHeader: 'Subtitle',
    message: "برجاء تحديث التطبيق لتجنب ايقافه ",
    buttons: [
      {
        text: 'الغاء',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          if(this.force_update=="1"){
            navigator['app'].exitApp();
          }
        }
      }, {
        text: 'تحديث',
        cssClass: 'prinmary',
        handler: () => {
          console.log(this.id);
          this.market.open(this.id);

        }
        
      }
    ]
    
   });
 
   await alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      
      // const msg={
      //   header: 'اختيار الجهاز',
      //   //subHeader: 'Subtitle',
      //   message: 'موجود من قبل \n\r' + 'هل تريد تسجيل جهاز جديد؟',
      //   buttons: [
      //       {
      //       text: 'لا',
      //       role: 'cancel',
      //       cssClass: 'secondary',
      //       handler: () => {
                
      //       }
      //       }, {
      //       text: 'نعم',
      //       cssClass: 'prinmary',
      //       handler: () => {

      //       }
            
      //       }
      //   ]

      //   }
    // this.platform.backButton.subscribeWithPriority(0,()=>{
    //   // if (this.routerOutlet && this.routerOutlet.canGoBack()) {
    //   //   // if (this.router.url === '/home-client' || this.router.url === '/home-user') {
    //   //   //  navigator['app'].exitApp();
    //   //   //   console.log('11111111111');
    //   //   // }else{
    //   //   //   console.log('22222222222');
    //   //   //   this.routerOutlet.pop();
    //   //   // }
    //   // } else 
    //   let nav = navigator['app'].getActiveNavs()[0];
    //   let activeView = nav.getActive();                

    //   if (this.router.url == '/client/home' || this.router.url == '/user/home') {
    //     nav.exitApp();
    //     //  console.log('33333333333');
    //     // msg.message="cannot go back";
    //     // const myAlert=  this.dialogs.create(msg);
    //     // myAlert.then(ex=>{
    //     //   ex.present()
    //     //  });
        
    //     }else{
    //       nav.pop();
    //     }
    //     // else{
          
    //     //   this.location.back();
    //     // }
    //   //   // or if that doesn't work, try
    //   //    //navigator['app'].exitApp();
    //   // } else {
    //   //     //alert("اضفط باك مرة اخرى");
    //   //   // this.routerOutlet.pop();
    //   //   console.log('44444444444444');
    //   //   msg.message=this.router.url;
    //   //   const myAlert=  this.dialogs.create(msg);
    //   //   myAlert.then(ex=>{
    //   //     ex.present()
    //   //    });
    //   // }
    // });
    

      firebase.initializeApp(environment.firebase);
      
      this.splashScreen.hide();
      
      // this.fb.onNotificationOpen()
      // .subscribe(data =>{
        
      //   this.router.navigateByUrl(data.route);
      // }
      // );
      // this.fcm.onNotification().subscribe(
      //       data =>{
      //   this.router.navigateByUrl(data.route);
      // }
      // );
      firebase.messaging().onMessage(
            data =>{
        this.router.navigateByUrl(data.route);
      }
      );
      
    //   this.fb.onTokenRefresh()
    //   .subscribe((token: string) => {
    //     if(this.auth.getToken())
    //     this.auth.saveNewDeviceID(token);
    //   });
    // });
    if(this.auth.getToken())
    this.fcm.getToken().then(token=>{
      this.auth.saveNewDeviceID(token);
    })
 
    this.fcm.onTokenRefresh().subscribe(
      (token: string) => {
        if(this.auth.getToken())
        this.auth.saveNewDeviceID(token);
      });



      this.statusBar.backgroundColorByHexString('#810505'); 


      // firebase.messaging().onTokenRefresh(
      //   (token: string) => {
      //     if(this.auth.getToken())
      //     this.auth.saveNewDeviceID(token);
      //   });
      // });
      
      this.statusBar.styleDefault();
      this.statusBar.isVisible=true;
  
      // let status bar overlay webview
      this.statusBar.styleLightContent();
  
        // set status bar to white
     // this.statusBar.backgroundColorByName("primary");
     

     
    });
   
  }
}
