import { Platform } from '@ionic/angular';

import { Router } from '@angular/router';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { apiResult, apiError } from './api-result';
import { Guid } from 'guid-typescript';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { AppVersion } from '@ionic-native/app-version/ngx';


@Injectable()
export class CallapiService {
  version:string=environment.version;
  package:string;
  constructor(
    public http:HttpClient,
    private shared:SharedService,
    private route:Router,
    //private crashlytic:FirebaseCrashlytics,
    private appVersion:AppVersion,
    private platform:Platform
    ) { 
      //this.crashlytic.initialise();
    //if(!this.platform.is('ios') && !this.platform.is('android')) return;
    this.getVersion();
  }
  getVersion(){
    this.appVersion.getVersionNumber().then((ver:string)=>{
      this.version=ver;
    });
    this.appVersion.getPackageName().then(id=>{
      this.package=id;
    })
  }
  getToken() {
    let token= localStorage.getItem(environment.tokenKey) || null;
    if(token==null) return null;
    return Guid.isGuid(token)?token:null;
  }
  getType() {
    return localStorage.getItem(environment.typeKey) || null;
  }
  
  getRequest(url:string,pars:any,success_callbak:any,error_callback:any=null){
    let parms=stringify(pars);
    let headers:HttpHeaders= new HttpHeaders({"APP_KEY":environment.apiKey});
    this.getVersion();
    if(this.getType()!=null) headers=headers.append("AUTH_TYPE",this.getType());
    if(this.getToken()!=null ) headers=headers.append("AUTH_KEY",this.getToken());
    if(this.version!=null )  headers=headers.append("APP_VER",this.version);
    
     this.http.get(environment.apiUrl +  url +(parms?"?":"")+parms,{headers})
     .pipe(map((result:apiResult)=>{return result}))
                      .subscribe(
                        next=>{
                          if (next.isSuccess) {
                                success_callbak(next.data);              
                              } else {
                                this.logException("GET " +url,headers,pars,next);
                                this.softErrorHandling({code:next.code,message:next.message});
                                if(error_callback!=undefined)  error_callback(next.message);
                            }
                          },
                          error=>{
                            this.logException("GET " +url,headers,pars,error);
                            if(error_callback!=undefined)  error_callback(error.statusText);
                            this.errorHandling(error);
                          }
                          );
  }
  
  postRequest(url:string,pars:any,success_callbak:any=null,error_callback:any=null){
    
    let headers:HttpHeaders= new HttpHeaders({"APP_KEY":environment.apiKey});
    this.getVersion();
    if(this.getType()!=null) headers=headers.append("AUTH_TYPE",this.getType());
    if(this.getToken()!=null ) headers=headers.append("AUTH_KEY",this.getToken());
    if(this.version!=null )  headers=headers.append("APP_VER",this.version);
    
    this.http.post(environment.apiUrl + url ,pars,{headers}).pipe(map((result:apiResult)=>{return result}))
            .subscribe(
              next=>{
                  if (next.isSuccess) {
                    if(success_callbak!=null)success_callbak(next.data);              
                  } else {
                    this.logException("POST " + url,headers,pars,next);
                    this.softErrorHandling({code:next.code,message:next.message});
                    if(error_callback!=null) error_callback({code:next.code,message:next.message});
                    
                  }
              },
              error=>{
                this.logException("POST " +url,headers,pars,error);
                if(error_callback!=null)  error_callback({code:error.status,message:error.statusText});
                //this.errorHandling(error)
              }
            ) 
  }
    logException(url,headers:HttpHeaders,pars,error){
      var obj={
        Package:this.package,
        Ver:this.version,
        Url:url,
        Headers:headers.keys().map(key =>
          `${key}: ${headers.get(key)}`).join("<br/>"),
        Body:pars,
        Response:JSON.stringify(error)

      }
      
      // this.http.post(environment.apiUrl+"/Log/Error",obj).subscribe(
      //   next=>{

      //   },
      //   error=>{

      //   }
      // )
     
    }
    errorHandling(error:any){
      if(error.status==403){
        this.route.navigate(['home']);
      }else if(error.status==401){
        this.shared.error("You are not allowed to perform this action");
      }else if(error.status==500){
        //this.shared.error("There are problem in the server !!");
      }else if(error.status==502){
        //this.shared.error("Bad Gateway error !!");
      }else if(error.status==406){
        this.shared.error("This option is disbaled now !!");
      }else{
        //this.shared.error(error.message);
      }
    }
    softErrorHandling(error:any){
      if(error.code==1403){
        this.route.navigate(['home']);
      }else if(error.code==1401){
        this.shared.error("ليس لديك صلاحية!");
      }else if(error.code==1403){
        this.route.navigate(['home']);
      }else if(error.code==1406){
        this.shared.error("هذه الميزة غير مفعلة الأن !");
      }else{
        this.shared.error(error.message);
      }
    }

     
    
    
}


