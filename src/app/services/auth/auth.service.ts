import { FCM } from '@ionic-native/fcm/ngx';
import { apiError } from './../dal/api-result';
import { CallapiService } from './../dal/callapi.service';
import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";
import { environment } from 'src/environments/environment';
// import { Firebase } from '@ionic-native/firebase/ngx';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { Storage } from '@ionic/storage';

 
@Injectable()
export class AuthService {
 public isLoggedIn:boolean=false;
 //user: any=null;
  constructor( private call:CallapiService,//private firebase:Firebase,
    private storage:Storage,
    private fcm:FCM
      ) {
 
  }

  getIfLoggedIn():any{
    return this.isLogin();

  }
  getType() {
    
    return localStorage.getItem(environment.typeKey) || null;

  }
  getToken() {
    let token=localStorage.getItem(environment.tokenKey) || null;
    if(token==null) return null;
    return Guid.isGuid(token)?token:null;
  }
  setToken(value: string) {
    localStorage.setItem(environment.tokenKey,value);
  }
  setType(value: string) {
    localStorage.setItem(environment.typeKey,value);
  }
  clearToken(){
    localStorage.removeItem(environment.tokenKey);
    localStorage.removeItem(environment.typeKey);
  }

 
  isLogin() {
    if (this.getToken()!=null && this.getToken()!=undefined) {
      return true;
    } else {
      return false;
    }
  }
  getUser() {
    return this.storage.get("user");
  }
  setUser(value: any) {
    this.storage.set("user",value);
    //this.user = value;
  }
 
  checkLogin(fnNext:any=null,fnError:any=null){

    if(this.getToken()!=null){
      //console.error(this.shared.getToken());
      this.call.postRequest("/User/Current","",
      next=>{
        if(next.account==null){
          next.account={MOBIL:next.phone};
        }
        this.setUser(next);
        this.setType(next.type)
        //this.setToken(next.token);
        if(fnNext) fnNext(next);
      },
      (error:apiError)=>{
        //this.setToken(null);
       
        if(fnError) fnError(error);
      }
    )
    }else{
      if(fnError) fnError("No Token");
    }
  }

  clientLogin(token:string,fnNext:any=null,fnError:any=null){
      this.fcm.getToken().then(deviceID=>{
          this.call.postRequest("/User/login",{"firebase_token":token,"device_id":deviceID},
          next=>{
            this.setUser(next.account);
            this.setToken(next.token);
            this.setType(next.type);
            if(fnNext!=null) fnNext(next);
          },
          error=>{
            this.setToken(null);
            if(fnError!=null) fnError(error);
          }
        )
      })

     
    
  }
  clientLoginByPhone(otp:string,phone:string,fnNext:any=null,fnError:any=null){
          this.call.postRequest("/User/loginbyphone",{"otp":otp,"mobile":phone},
          next=>{
            this.setUser(next.account);
            this.setToken(next.token);
            this.setType(next.type);
            if(fnNext!=null) fnNext(next);
          },
          error=>{
            this.setToken(null);
            if(fnError!=null) fnError(error);
          }
          )
    
  }
  

  sendVerifyCode(phone:string,fnNext:any=null,fnError:any=null){
          this.call.postRequest("/User/sendverifycode?mobile="+phone,"",
          next=>{
            if(fnNext!=null) fnNext(next);
          },
          error=>{
            if(fnError!=null) fnError(error);
          }
        )
      
  }
    
  userLogin(username:string,password:string,fnNext:any=null,fnError:any=null){
         this.call.postRequest("/User/UserLogin",{"username":username,"password":password},
        next=>{
          this.setUser(next.account);
          this.setToken(next.token);
          this.setType(next.type);
          if(this.getToken())
          this.fcm.getToken().then(token=>{
            this.saveNewDeviceID(token);
          })
          if(fnNext!=null) fnNext(next);
        },
        error=>{
          this.setToken(null);
          this.setType(null);
          this.setUser(null);
          if(fnError!=null) fnError(error);
        }
      )
   }

    logout(fnNext:any=null,fnError:any=null) {
      this.call.getRequest("/User/Logout","",
              next => { 
                          this.setUser(null);
                          this.clearToken();
                          if(fnNext) fnNext(next);
                          firebase.auth().signOut();
                      },
              error=>
                      {
                       
                        if(fnError) fnError(error);
                    }
          );
    }
    saveNewDeviceID(device_id:string,fnNext:any=null,fnError:any=null) {
      this.call.postRequest("/User/SaveNewDeviceID?device_id="+device_id,"",
              next => { 
                          if(fnNext) fnNext(next);
                      },
              error=>
                      {
                        if(fnError) fnError(error);
                    }
          );
    }

    saveMyProfile(profileData:any,fnNext:any=null,fnError:any=null){
      this.call.postRequest("/Client/Create",profileData,
      next => { 
                  if(fnNext) fnNext(next);
              },
      error=>
              {
                if(fnError) fnError(error);
            }
        );
    }
}
