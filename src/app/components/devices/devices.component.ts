import { OrdersService } from 'src/app/services/bll/orders.service';
import { apiError } from './../../services/dal/api-result';
import { LookupsService } from './../../services/bll/lookups.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  // selectedDevice:number;
  // selectedMark: number;
  // selected={
  //   DeviceTypeID:0,
  //   MarkID:0,
  //   DeviceCode:1,
  //   //DeviceName:''
  // }
  //step: number=1;
  public env=environment;
  // @ViewChild(IonSlides,{static: true}) slides:IonSlides;
  public step=0;
  DeviceTypes: any[];
  Marks: any[];
  filteredMarks: any;
  filteredDeviceTypes: any;
  constructor(private router:Router,
    private  lookup:LookupsService,
    private auth:AuthService,
    private platform:Platform,
    private lookups:LookupsService,
    private dialogs:AlertController,
    private order:OrdersService) {
    
   }

   ngOnInit() {
    this.loadDevicetypes();
    this.loadMarks();

    // this.platform.backButton.subscribe(() => {
    //   this.router.navigateByUrl("/client/home")
    // });
  }
  loadDevicetypes(){
    this.lookup.getDeviceTypes(next=>{
      this.DeviceTypes=next;
      this.filteredDeviceTypes=next;
    },
    (error:apiError)=>{
    })

  }
  loadMarks(){
    this.lookup.getMarks(next=>{
      this.Marks=next;
      this.filteredMarks=next;
      
      
    },
    (error:apiError)=>{
    
    }) 
  }
  
  selectDevice(n:number){
    if(!this.order.newOrder)this.order.resetNewOrder();
    this.order.newOrder.DeviceTypeID=n;


    // this.selected.DeviceTypeID=n;
    this.step=1;
    // this.slides.slideNext();
    //this.step=2;
    
  }
  onDeviceSearch(event){
  
    this.filteredDeviceTypes=this.DeviceTypes.filter(itm=>itm.TYP_Devices_NAM.indexOf(event.target.value)!==-1);
   
  }
  onMarkSearch(event){
  
    this.filteredMarks=this.Marks.filter(itm=>itm.MARK_NAM.indexOf(event.target.value)!==-1);
   
  }

  async selectMark(n:number){
    this.order.newOrder.MarkID=n;

      // this.selected.MarkID=n;
      this.auth.getUser().then(next=>{
        if(!next) {
          // this.router.navigateByUrl("/client/edit-profile?device="+this.selected.DeviceTypeID+"&mark="+this.selected.MarkID+"&code="+this.selected.DeviceCode);
          this.router.navigateByUrl("/client/edit-profile");
          return;
        }
        
         this.lookups.getMyDevices(
          async next=>{
             const similler= next.filter(a=>(<string>a.ID).indexOf(this.order.newOrder.DeviceTypeID+'-'+this.order.newOrder.MarkID+'-')!==-1);
             if(similler.length==0){
              this.order.newOrder.DeviceCode=1;
              // this.router.navigateByUrl("/client/new-order?device="+this.selected.DeviceTypeID+"&mark="+this.selected.MarkID+"&code="+this.selected.DeviceCode);
              this.router.navigateByUrl("/client/new-order");
              return;
             }
             const deviceName=this.DeviceTypes.filter(a=>a.TYP_Devices_ID==this.order.newOrder.DeviceTypeID)[0].TYP_Devices_NAM + ' ' + 
                              this.Marks.filter(a=>a.MARK_ID==this.order.newOrder.MarkID)[0].MARK_NAM;
             
         const alert=await  this.dialogs.create({
              header: 'اختيار الجهاز',
              //subHeader: 'Subtitle',
              message: deviceName + ' ' + 'موجود من قبل \n\r' + 'هل تريد تسجيل جهاز جديد؟',
              buttons: [
                {
                  text: 'لا',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    this.router.navigateByUrl('/client/select-device/my-devices?filter='+deviceName);
                   
                  }
                }, {
                  text: 'نعم',
                  cssClass: 'prinmary',
                  handler: () => {
                    this.order.newOrder.DeviceCode=similler.length+1;
                    // this.router.navigateByUrl("/client/new-order?device="+this.order.newOrder.DeviceTypeID+"&mark="+this.order.newOrder.MarkID+"&code="+this.order.newOrder.DeviceCode);
                    this.router.navigateByUrl("/client/new-order");
                  }
                  
                }
              ]
              
             });
           
             await alert.present();
             
            
            //  .then(() => console.log('Dialog dismissed'))
            //  .catch(e => console.log('Error displaying dialog', e));
           
            },
          (error:apiError)=>{
    
          })
      });
     
    }
  }
