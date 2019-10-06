import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from './../../services/loading.service';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupsService } from './../../services/bll/lookups.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/bll/orders.service';
import { CounterService } from 'src/app/services/bll/counter.service';

@Component({
  selector: 'app-order-close',
  templateUrl: './order-close.page.html',
  styleUrls: ['./order-close.page.scss'],
})
export class OrderClosePage implements OnInit {
  follows: any;
  states: any;
  data: any={};
  defaults={
    follow:1,
    status:0
  }
  followActionSheetOptions: any = {
    header: 'المتابعة', 
    subHeader: ''
  };
  caseActionSheetOptions: any = {
    header: 'حالة الأمر',
    subHeader: ''
  };
  ord: any={};
  submited: boolean;
  constructor(private order:OrdersService,
              private lookup:LookupsService,
              private route:Router,
              private router:ActivatedRoute,
              private toaster:ToastController,
              private counter:CounterService,
              private loading:LoadingService,
              private auth:AuthService) {
    this.data.Follow_ID=this.defaults.follow;
    //this.data.OrderCase_ID=this.defaults.status;
    this.data.StockItems=[];

  }
  
  ngOnInit() {
    this.loading.present();
    this.lookup.getFollowStates(
      next=>{
        this.follows=next;
        this.data.Follow_ID=this.defaults.follow;
        
        }
      )
      this.lookup.getOrderStates(
        next=>{
          next.splice(0, 0, {ID:0,Name:"*.*"});
          this.states=next;
          this.data.OrderCase_ID=this.defaults.status;
          this.loading.dismiss();
        }
      )
        this.router.queryParams.subscribe(params=>{
          this.data.Order_No=+params['order_no'];
          this.data.Comp_No=+params['comp_no'];
          this.data.Comp_ID=+params['comp_id'];
          this.order.getTechOrderDetails(this.data.Comp_ID,
            next=>{
              this.ord=next;
              this.loading.dismiss();
            })
        })
       
  }
   onSubmit(){
    this.submited=true;
    
    this.loading.present("جاري الحفظ ...");
    if(this.data.OrderCase_ID==this.defaults.status && this.data.Follow_ID==this.defaults.follow){
      this.toaster.create({message:"اختر حالة الطلب او المتابعة",duration:2000}).then(toast=>{toast.present()});
      this.loading.dismiss();
      this.submited=false;
      return ;
    }
    if((this.data.Customer_Report||"")==""){
      this.toaster.create({message:"ادخل تقرير العميل ",duration:2000}).then(toast=>{toast.present()})
      this.loading.dismiss();
      this.submited=false;
      return ;
    }
    if((this.data.Tech_Report||"")==""){
      this.toaster.create({message:"ادخل تقرير الفني ",duration:2000}).then(toast=>{toast.present()})
      this.loading.dismiss();
      this.submited=false;

      return ;
    }

    if((this.data.Follow_ID==3 || this.data.Follow_ID==10) && (this.data.Action_Date||"")==""){
      this.toaster.create({message:"ادخل تاريخ التأجيل ",duration:2000}).then(toast=>{toast.present()})
      this.loading.dismiss();
      this.submited=false;

      return ;
    }
    if(this.data.Warranty>24 ||this.data.Warranty<0){
      this.toaster.create({message:"فترة الضمان غير منطقية ",duration:2000}).then(toast=>{toast.present()})
      this.loading.dismiss();
      this.submited=false;

      return ;
    }
   
    if(this.data.Cost>0 && (this.data.Invoice_No||'')==''){
        this.toaster.create({message:"ادخل رقم الفاتورة ",duration:2000}).then(toast=>{toast.present()})
        this.loading.dismiss();
        this.submited=false;

        return ;
      }
    this.order.closeOrder(this.data,
      next=>{
        // const orders =this.order.currentOrders.data.filter(a=>a.ORDER_NO==this.data.Order_No);
        // if(orders.length>0){
        //   this.order.currentOrders.data.splice(
        //     this.order.currentOrders.data.indexOf(orders[0]),
        //     1
        //     )
        //   }
        //   this.loading.dismiss();
        this.auth.getUser().then(user=>{
          this.order.getMoreOrders({draw:0,length :1000,start: 0}, 0,"","",user.ENG_ID,0,
            next=>{
              this.order.currentOrders=next;
              this.loading.dismiss();
              this.submited=false;

            },
            error=>{
              this.loading.dismiss();
              this.submited=false;

            }
            );
            this.counter.getUserCounters();
          this.route.navigateByUrl("/user/success");
        },
        error=>{
          this.loading.dismiss();
          this.submited=false;

        
        })

        })
  }


}
