import { AuthService } from 'src/app/services/auth/auth.service';
import { CounterService } from './../../services/bll/counter.service';
import { LoadingService } from './../../services/loading.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Router } from '@angular/router';
import { IonSlides, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AppSettingsService } from 'src/app/services/bll/app-settings.service';

@Component({
    selector: 'client-home',
    templateUrl: './client-home.component.html',
    styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {
    data:any={opendorders:0,closedorders:0,devices:0};
    slides:string[]=[
        '/content/imgs/slider/1.jpg',
        '/content/imgs/slider/2.jpg',
        '/content/imgs/slider/3.jpg'
    ];
    slideOpts = {
        effect: 'flip'
      };
    env=environment;
    whatsapp:string;
    hotline: string;
    websiteUrl: string;
    helpUrl: string;
    // @ViewChild(IonRouterOutlet,{static:false}) routerOutlet: IonRouterOutlet;

    @ViewChild(IonSlides,{static: true}) slider:IonSlides;
    ngOnInit(event=null): void {
        this.counter.getClientCounters(
            next=>{
                 this.data=next;
                 this.loadSlider(event)
                 //if(event) event.target.complete();
            },
            error=>{
                 this.loadSlider(event)
            }
        )
   
       this.slider.startAutoplay() ;
      
         
    }
    ngAfterViewInit() {
        this.slider.updateAutoHeight();
    }
    loadSlider(event=null){
        this.settings.getSettings("images_url",'/content/imgs/',
       images_url=>{
            this.settings.getSettings("home_slider",'1.jpg|2.jpg|3.jpg',
            next=>{
                    this.slides=next.split("|").map(i=>images_url + 'slider/'+i);
                    this.slider.startAutoplay() ;
                    if(event) event.target.complete();
            },
            error=>{
                if(event) event.target.complete();
            });

            this.settings.getSettings("web_site_url",'http://19089-co.site',next=>this.websiteUrl =next);
            this.settings.getSettings("help_page_url",'http://19089-co.site',next=>this.helpUrl =next);
            this.settings.getSettings("whatsapp_number",'',next=>this.whatsapp =next);
            this.settings.getSettings("hotline_number",'',next=>this.hotline =next);
        });
    }


    constructor(private counter:CounterService,private router:Router,private platform:Platform,
        private loading:LoadingService,
        private settings:AppSettingsService,
        private auth:AuthService
        // private dialogs:AlertController

        ){
           
          
    }

    newOrder(){
        this.auth.checkLogin(user=>{
            if((user.account||null)==null || (user.account.NAME||null)==null || user.account.NAME==''){
                this.router.navigateByUrl("/client/edit-profile?fororder=1");
            }else{
                this.router.navigateByUrl("/client/address");
            }
        })
    }
    
    
    open(url){
        this.router.navigateByUrl(url);
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
