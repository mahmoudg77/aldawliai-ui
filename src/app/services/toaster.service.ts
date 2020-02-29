import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  isLoading = false;

  constructor(public toastController: ToastController) { }

   present(message:string="") {
    this.isLoading = true;
    return  this.toastController.create({
        message:message,
        duration: 5000,
        
    }).then(a => {
      a.present().then(() => {
        // console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(
            //   () => console.log('abort presenting')
              );
        }
      });
    });
  }

 dismiss() {
    this.isLoading = false;
    try {
      return this.toastController.dismiss().then(
        // () => console.log('dismissed')
        );
    } catch (error) {
      
    }
   
  }
}