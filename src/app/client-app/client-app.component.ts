import { SharedService } from 'src/app/services/shared.service';
import { LoadingService } from './../services/loading.service';
import { AppSettingsService } from './../services/bll/app-settings.service';
import { Platform, IonRouterOutlet, AlertController } from '@ionic/angular';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
// import { WebIntent } from '@ionic-native/web-intent/ngx';

@Component({
    selector: './client-app',
    templateUrl: './client-app.component.html',
    styleUrls: ['./client-app.component.scss']
})
export class ClientAppComponent implements OnInit {
    public appPages = [
        {
          title: 'الرئيسيــــة',
          url: '/client/home',
          icon: 'home',
          onClick:url=>{this.openPage(url)}
        },
        {
          title: 'تسجيل أوردر جديد',
          url: ''/*'/client/address'*/,
          icon: 'add',
          onClick:url=>{this.newOrder()}
        },
        {
          title: 'اوردراتــــي',
          url: '/client/my-orders',
          icon: 'filing',
          onClick:url=>{this.openPage(url)}
        },
        {
          title: 'فواتيــــري',
          url: '/client/invoices',
          icon: 'card',
          onClick:url=>{this.openPage(url)}
        },
        {
          title: 'البيانات الشخصية',
          url: '/client/profile',
          icon: 'contact',
          onClick:url=>{this.openPage(url)}
        },
        {
          title: 'الموقع الإلكتروني',
          icon: 'planet',
          onClick:url=>{this.openWebSite(this.websiteUrl)}
        },
        {
          title: 'تعليمــــات',
          icon: 'help-circle',
          onClick:url=>{this.openWebSite(this.helpUrl)}
        },
        {
          title: 'عن التطبيق',
          icon: 'information-circle',
          url: '/about',
          onClick:url=>{this.openPage(url)}
        },
        {
          title: 'تسجيل الخروج',
          icon: 'log-out',
          onClick:url=>{this.logout()}
        }
      ];
  websiteUrl: string;
  helpUrl: string;
  @ViewChild(IonRouterOutlet,{static:false}) routerOutlet: IonRouterOutlet;
    ngOnInit(): void {
        // this.statusBar.styleDefault();
        // this.statusBar.isVisible=true;

        // // let status bar overlay webview
        // this.statusBar.styleLightContent();

        //   // set status bar to white
        // this.statusBar.backgroundColorByName("primary");
        this.settings.getSettings("web_site_url",'http://19089-co.site',next=>this.websiteUrl =next);
         this.settings.getSettings("help_page_url",'http://19089-co.site',next=>this.helpUrl =next);
         
    }
     constructor(
        // private statusBar: StatusBar,
        private auth:AuthService,
        private router:Router,
        // private inappbrowser:InAppBrowser,
        private platform:Platform,
        private settings:AppSettingsService,
        // private webIntent:WebIntent,
        private loading:LoadingService,
        public shared:SharedService
     ){

      // const msg={
      //   header: 'اختيار الجهاز',
      //   //subHeader: 'Subtitle',
      //   message: 'موجود من قبل \n\r' + 'هل تريد تسجيل جهاز جديد؟',
      //   buttons: [
      //     {
      //       text: 'لا',
      //       role: 'cancel',
      //       cssClass: 'secondary',
      //       handler: () => {
              
      //       }
      //     }, {
      //       text: 'نعم',
      //       cssClass: 'prinmary',
      //       handler: () => {

      //       }
            
      //     }
      //   ]
        
      //  }
     
     
        // platform.backButton.subscribeWithPriority(0,()=>{
        //   if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        //     this.routerOutlet.pop();
        //   } else if (this.router.url === '/login-client' || this.router.url === '/check' || this.router.url === '/login-user') {
        //     //this.platform.exitApp();
        //     msg.message=this.router.url;
            // const myAlert=  this.dialogs.create(msg);
            // myAlert.then(ex=>{
            //   ex.present()
            //  });
        //     // or if that doesn't work, try
        //    // navigator['app'].exitApp();
        //   } else {
        //     //alert("اضفط باك مرة اخرى");
        //     msg.message=this.router.url;
        //     const myAlert=  this.dialogs.create(msg);
        //     myAlert.then(ex=>{
        //       ex.present()
        //      });
        //   }
        // });
      
      }
    logout(){
      this.auth.logout(next=>{
        this.router.navigateByUrl("/home");
      })

    }
    openWebSite(url:string){
      //if(this.platform.is("android")||this.platform.is("ios")){
        //this.inappbrowser.create(url,"_self").show();
        this.loading.present();
        this.shared.openWebSite(url);
        this.loading.dismiss()
      // }else{
      //   window.open(url,"_self");
      // }
    }
  //   newOrder(){
  //     this.auth.getUser().then(user=>{
  //         if(!user){
  //             this.router.navigateByUrl("/client/edit-profile?fororder=1");
  //         }else{
  //             this.router.navigateByUrl("/client/address");
  //         }
  //     })
  // }

  newOrder(){
    this.auth.checkLogin(user=>{
      if((user.account||null)==null || (user.account.NAME||null)==null || user.account.NAME==''){
          this.router.navigateByUrl("/client/edit-profile?fororder=1");
      }else{
          this.router.navigateByUrl("/client/address");
      }
  })
}
    // openIntent(url:string,intent:string){
    //   const options = {
    //     action: this.webIntent.ACTION_VIEW,
    //     url: url,
    //     package:intent,//"com.whatsapp",
       
    //   };
    //   //this.share.shareVia("","","");
    //   this.webIntent.startActivity(options).then(next=>{}, error=>{alert(error)});
    // }
    openPage(url:string){
      this.router.navigateByUrl(url);
    }
    fabButtonOpened: Boolean;
    openFabButton(){
      if(this.fabButtonOpened==false){
          this.fabButtonOpened=true;
      }else{
          this.fabButtonOpened=false;
      }
    }
}
