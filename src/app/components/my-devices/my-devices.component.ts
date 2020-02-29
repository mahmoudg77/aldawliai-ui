import { apiError } from './../../services/dal/api-result';
import { Platform, IonSearchbar } from '@ionic/angular';
import { LookupsService } from './../../services/bll/lookups.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/services/bll/orders.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-my-devices',
  templateUrl: './my-devices.component.html',
  styleUrls: ['./my-devices.component.scss'],
})
export class MyDevicesComponent implements OnInit {
  devices: any[];
  env=environment;
  filtered:any[];

  @ViewChild(IonSearchbar,{static: true}) searchBar:IonSearchbar;
  constructor(private  lookups:LookupsService,
    private router:Router,
    private auth:AuthService,
    private platform:Platform,
    private route:ActivatedRoute,
    private order:OrdersService) { }

  ngOnInit() {
    this.lookups.getMyDevices(
      next=>{
          this.devices=next;
          this.filtered=next;//.filter(itm=>itm.Balance>0);
          this.route.queryParams.subscribe(params=>{
            this.searchBar.value= params['filter']||'';
          })
      },
      (error:apiError)=>{

      })
    
  }
  onSearchChange(event){
  
    this.filtered=this.devices.filter(itm=>itm.Name.indexOf(event.target.value)!==-1);
   
  }
  parsDeviceID(ID:string){
    const ids=ID.split("-");

    return {
      DeviceTypeID: ids[0],
      MarkID:ids[1],
      DeviceCode:ids[2]
    }
}

selectMyDevice(ID:string){
  const selected=this.parsDeviceID(ID);
  this.auth.getUser().then(next=>{
  if(!next) {
    this.router.navigateByUrl("/client/edit-profile");
    return;
  }
  
  this.order.newOrder.DeviceTypeID= parseInt(selected.DeviceTypeID);
  this.order.newOrder.MarkID= parseInt(selected.MarkID);
  this.order.newOrder.DeviceCode= parseInt(selected.DeviceCode);
  // this.router.navigateByUrl("/client/new-order?device="+ selected.DeviceTypeID+"&mark="+selected.MarkID+"&code="+selected.DeviceCode);
  this.router.navigateByUrl("/client/new-order");
  });
}


}
