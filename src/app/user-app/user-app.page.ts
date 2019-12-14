import { LoadingService } from 'src/app/services/loading.service';
import { AppSettingsService } from './../services/bll/app-settings.service';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-app',
  templateUrl: './user-app.page.html',
  styleUrls: ['./user-app.page.scss'],
})
export class UserAppPage implements OnInit {
  public appPages = [
    {
      title: 'الرئيسيــــة',
      url: '/user/home',
      icon: 'home',
      onClick:url=>{this.openPage(url)}
    },
    {
      title: 'اوردرات جديدة',
      url: '/user/orders/pre',
      icon: 'filing',
      onClick:url=>{this.openPage(url)}
    },
    {
      title: 'اوردرات اليوم',
      url: '/user/orders/new',
      icon: 'filing',
      onClick:url=>{this.openPage(url)}
    },
    {
      title: 'جميع الأوردرات',
      url: '/user/order-search',
      icon: 'filing',
      onClick:url=>{this.openPage(url)}
    },
    {
      title: 'المخزون',
      url: '/user/stock',
      icon: 'card',
      onClick:url=>{this.openPage(url)}
    },
    {
      title: 'البيانات الشخصية',
      url: '/user/profile',
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
  websiteUrl:string;
  helpUrl: string;
  constructor(
    // private statusBar: StatusBar,
    private auth:AuthService,
    private router:Router,
    // private inappbrowser:InAppBrowser,
    private platform:Platform,
    private settings:AppSettingsService,
    private loading:LoadingService,

){

}
logout(){
  this.auth.logout(next=>{
    this.router.navigateByUrl("/home");
  })

}

  ngOnInit() {
    // this.statusBar.styleDefault();
    // this.statusBar.isVisible=true;

    // // let status bar overlay webview
    // this.statusBar.styleLightContent();

    //   // set status bar to white
    // this.statusBar.backgroundColorByName("primary");

    // this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(event => {
        
    //   if(!this.auth.getUser()){
    //       this.auth.checkLogin();
    //     }
       
      
    // });

        this.settings.getSettings("web_site_url",'http://19089-co.site',
         next=>{
                this.websiteUrl =next;
         });
         this.settings.getSettings("help_page_url",'http://19089-co.site',
         next=>{
                this.helpUrl =next;
         });
     
  }


  openWebSite(url:string){
    // if(this.platform.is("android")||this.platform.is("ios")){
    //   this.inappbrowser.create(url,"_self").show();
    // }else{
      this.loading.present();
      window.open(url,"_self");
      this.loading.dismiss()
  // }
  }
  openPage(url:string){
    this.router.navigateByUrl(url);
  }
}
