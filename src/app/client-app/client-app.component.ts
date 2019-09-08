import { LoadingService } from './../services/loading.service';
import { AppSettingsService } from './../services/bll/app-settings.service';
import { Platform } from '@ionic/angular';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
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
          url: '/client/select-device',
          icon: 'add',
          onClick:url=>{this.openPage(url)}
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
  whatsapp:string;
    ngOnInit(): void {
        // this.statusBar.styleDefault();
        // this.statusBar.isVisible=true;

        // // let status bar overlay webview
        // this.statusBar.styleLightContent();

        //   // set status bar to white
        // this.statusBar.backgroundColorByName("primary");
        this.settings.getSettings("web_site_url",'http://19089-co.site',
         next=>{
                this.websiteUrl =next;
         });
         this.settings.getSettings("help_page_url",'http://19089-co.site',
         next=>{
                this.helpUrl =next;
         });
         this.settings.getSettings("whatsapp_number",'201143184244',
         next=>{
                this.whatsapp =next;
         });
    }
    constructor(
        // private statusBar: StatusBar,
        private auth:AuthService,
        private router:Router,
        // private inappbrowser:InAppBrowser,
        private platform:Platform,
        private settings:AppSettingsService,
        // private webIntent:WebIntent,
        private loading:LoadingService
    ){

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
        window.open(url,"_self");
        this.loading.dismiss()
      // }else{
      //   window.open(url,"_self");
      // }
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
