import { ToasterService } from './../services/toaster.service';
import { AuthService } from './../services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'page-client-login',
  templateUrl: './login-client.page.html',
  styleUrls: ['./login-client.page.scss'],
})
export class LoginClientPage implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.step=0;
    this.verificationId=null;
    this.verifyForm.reset();
    this.loginForm.reset();
  }
  loginForm:FormGroup;
  step: number=0;
  verifyForm: FormGroup;
  verificationId: any;
  err: any;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  loginMethod: number=0;
  constructor(
    private platform: Platform,
    private loadingService:LoadingService,
    public toastController: ToasterService,
    private router:Router,
    private shared:SharedService,
    private formBuilder:FormBuilder,
    // private statusBar:StatusBar,
    private auth:AuthService,
    private ngzone:NgZone,
    ) { 
    this.loginForm=this.formBuilder.group({
      phone:['',Validators.required],
    });
    this.verifyForm=this.formBuilder.group({
      verifyCode:['',Validators.required],
    });
    
  }

  ngOnInit() {

    this.platform.ready().then(next=>{
    try {
      if(this.platform.is("android")){
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
        size:"invisible",
      }); 
      this.recaptchaVerifier.render();
        //alert('rendered');
    }
      } catch (error) {
       alert(error); 
      }  

    });

// if(this.platform.is("android")){
  
// }  
// this.statusBar.styleDefault();
    // this.statusBar.isVisible=true;

    // // let status bar overlay webview
    // this.statusBar.styleLightContent();

    //   // set status bar to white
    // this.statusBar.backgroundColorByName("primary");
  //this.FirebaseAuth.

  
      //After try to login 
      firebase.auth().onAuthStateChanged(next=>{
        console.log(next);
        if(next==null) {
            this.loadingService.dismiss();
            //this.step=1;
            //this.toastController.present("null firebase auth")
          return;
        }
        next.getIdToken().then(token=>{
          var idToken=token;
          this.auth.clientLogin(idToken,
            next=>{
              this.router.navigateByUrl("/client/home");
              this.loadingService.dismiss();
            },
            error=>{
            })
        },error=>{
        });
      },error=>{

      },()=>{

       });

       /////////////////
    
  }

  onSubmit(){
    
    if(this.platform.is("ios")){
      
      this.auth.sendVerifyCode(this.loginForm.get("phone").value,success=>{
        //if(success==false){
          //   this.auth.clientLoginByPhone("555555",this.loginForm.get("phone").value,success=>{
          //     this.router.navigateByUrl("/client/home");
          //   if(this.loadingService.isLoading)  
          //   this.loadingService.dismiss();
          // });
          // if(this.loadingService.isLoading)  
          // this.loadingService.dismiss();
          // this.router.navigateByUrl("/client/home");
          //this.step=1;
      if(success==false){

          this.step=1;
          this.loginMethod=1;
          // if(this.loadingService.isLoading)  
          // this.loadingService.dismiss();

          }
        });
      return; 
    }


    //console.log(this.loginForm.get("phone").value);
    this.loadingService.present("جاري التحقق من البيانات ...");

    if(firebase.auth().currentUser!=null){
      if(firebase.auth().currentUser.phoneNumber=="+20"+this.loginForm.get("phone").value){
        firebase.auth().currentUser.getIdToken().then(idToken=>{
          this.auth.clientLogin(idToken,
            next=>{
              this.router.navigateByUrl("/client/home");
              this.loadingService.dismiss();
            },
            error=>{
              this.loadingService.dismiss();
              this.toastController.present(error);
            })
        })
       return;
      }
    }
      firebase.auth().signInWithPhoneNumber("+20"+this.loginForm.get("phone").value,this.recaptchaVerifier).then(credential=>{
        this.verificationId= credential.verificationId;
        this.step=1;
        this.loginMethod=0;
        this.loadingService.dismiss();

      }).catch(error=>{

        this.auth.sendVerifyCode(this.loginForm.get("phone").value,success=>{
            if(success==true){
              this.step=1;
              this.loginMethod=1;
            }
            this.loadingService.dismiss();

        });
        this.toastController.present( error );

      });
      
  }

  onVerify(){
    this.loadingService.dismiss();
    this.loadingService.present("جاري التحقق من البيانات ...");
    
    const code:string=<string>this.verifyForm.get("verifyCode").value;
    if(this.loginMethod==1){
      this.auth.clientLoginByPhone(code,this.loginForm.get("phone").value,success=>{
        this.router.navigateByUrl("/client/home");
        if(this.loadingService.isLoading)  
        this.loadingService.dismiss();
      });
     return; 
    }

      let signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, `${code}`);

      firebase.auth().signInWithCredential(signInCredential).then((info) => {
       
      }, 
      (error) => {

      }

      );

        

  }

 
   
    
    
   

}
