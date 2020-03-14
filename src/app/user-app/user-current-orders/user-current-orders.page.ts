import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/bll/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-current-orders',
  templateUrl: './user-current-orders.page.html',
  styleUrls: ['./user-current-orders.page.scss'],
})
export class UserCurrentOrdersPage implements OnInit {
  data={
    draw : 0,
    recordsTotal:0,
    recordsFiltered:0,
    data:[],
  };
  dataLoader={
    draw:0,
    length :1000,
    start: 0
  }
  title: string;
  constructor(public order:OrdersService,
    private route:Router,
    private loading:LoadingService,
    private auth:AuthService) { }

  ngOnInit(event=null) {
    this.dataLoader={
      draw:0,
      length :1000,
      start: 0
    }
    this.loading.present();
    this.auth.getUser().then(user=>{
      
      this.order.getMoreOrders(this.dataLoader, 0,"","",user.account.ENG_ID,0,
      next=>{
        this.order.currentOrders=next;
        this.loading.dismiss();
        if(event) event.target.complete();
      },
      error=>{
        if(event) event.target.complete();
      }
      );
    })
  }
  onSearchClick(){
    this.route.navigateByUrl("/user/order-search")
  }
  
  openOrderHistory(id:number,comp_no:number){
    this.route.navigateByUrl("/user/orders/history/"+id+"?comp_no=" + comp_no+"&tosure=0");
  }

  openClientOrders(id:number){
    this.route.navigate(['/','user','orders','search'],{
      queryParams: {cst_id:id},
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: true
      // do not trigger navigation
    });

  }


}
