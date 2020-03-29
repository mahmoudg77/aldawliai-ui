import { SharedService } from 'src/app/services/shared.service';
import { AppSettingsService } from './../services/bll/app-settings.service';
import { Platform } from '@ionic/angular';
// import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  websiteUrl: string;
  helpUrl: string;
  ngOnInit(): void {
      // this.statusBar.styleDefault();
      // this.statusBar.isVisible=true;

      localStorage.clear();

      this.settings.getSettings("web_site_url",'http://19089-co.site',
      next=>{
             this.websiteUrl =next;
      });
      this.settings.getSettings("help_page_url",'http://19089-co.site',
      next=>{
             this.helpUrl =next;
      });
  }
  constructor(
      // private statusBar: StatusBar
      private router:Router,
      private inappbrowser:InAppBrowser,
      private platform:Platform,
      private settings:AppSettingsService,
      public shared:SharedService

  ){

  }


  // openWebSite(url:string){
  //   //console.log(url);
  //   // if(this.platform.is("android")||this.platform.is("ios")){
  //   //   this.inappbrowser.create(url,"_blank").show();
  //   // }else{
  //   //   window.open(url);
  //   // }
    
  // }
  openPage(url:string){
    this.router.navigateByUrl(url);
  }
}
