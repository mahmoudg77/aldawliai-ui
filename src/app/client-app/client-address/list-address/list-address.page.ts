import { Order } from './../../../services/bll/bll';
import { OrdersService } from 'src/app/services/bll/orders.service';
import { Router } from '@angular/router';
import { AddAddressPage } from './../add-address/add-address.page';
import { LoadingService } from './../../../services/loading.service';
import { ClientsService } from './../../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.page.html',
  styleUrls: ['./list-address.page.scss'],
})
export class ListAddressPage implements OnInit {

  constructor(private clients:ClientsService,
    private lookup:LoadingService,
    public modalController: ModalController,
    private route:Router,
    private order:OrdersService) { 

    }

    address:any[]=[];
    selected:any;
  ngOnInit() {
    this.clients.getMyAddress(
      data=>{
        console.log(data);
        this.address=data;
        if(this.address.length>0)
          this.selected=this.address[this.address.length-1];
        else 
          this.addNew();
         
      }
    )
  }
  
  async addNew() {
    const modal = await this.modalController.create({
      component: AddAddressPage,
    });
    
    await modal.present();
      const {data}  = await modal.onWillDismiss();
      if(data.isSuccess){
        this.address.push(data.data);
        this.selected=data.data;
        if(!this.order.newOrder)this.order.resetNewOrder();
        //this.order.newOrder.Address=data.data;
        //console.log(data.data);
        this.next();
      }

  }
  cancel(){
    this.route.navigateByUrl("/client/home");
  }

  next(){
    if(!this.order.newOrder)this.order.resetNewOrder();
    this.order.newOrder.Address=this.selected;
    this.order.newOrder.AddressID=this.selected.ADDRESS_ID;

    this.route.navigateByUrl("/client/select-device");
  }

}
