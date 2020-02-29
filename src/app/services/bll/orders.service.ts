import { Order } from './bll';
import { DataLoaderService } from './../dal/data-loader.service';
import { CallapiService } from './../dal/callapi.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private api:CallapiService) {

   }
   public newOrder:Order;
   public currentOrders={
      draw : 0,
      recordsTotal:0,
      recordsFiltered:0,
      data:[],
    };
    public preOrders=[];
   resetNewOrder(){
     this.newOrder=new Order();
   }
   getMyOrders(next:any=null,error:any=null,){
     this.api.getRequest("/Order/MyOrders","",data=>{if(next)next(data);},err=>{if(error)error(err);});
   }

   saveOrder(order:any,next:any=null,error:any=null){
    this.api.postRequest("/Order/Create",order,data=>{if(next)next(data);},err=>{if(error)error(err);});

   }
 
   getOrderDetails(id:number,next:any=null,error:any=null,){
     this.api.getRequest("/Order/OrderDetails?ID="+id,"",data=>{if(next)next(data);},err=>{if(error)error(err);});
   }

   getOrderHistory(id:number,next:any=null,error:any=null,){
     this.api.getRequest("/Order/OrderHistory/"+id,"",data=>{if(next)next(data);},err=>{if(error)error(err);});
   }
   
   getAllOrders(state=null,from="",to="",eng_id=0,cst_id=0,next:any=null,error:any=null,){
    this.api.getRequest("/order/Tech/MyOrders?state="+state+"&from="+from+"&to="+to+"&eng_id="+eng_id+"&cst_id="+cst_id,"",data=>{
      if(next){
        next(data);
      }
    
    },err=>{if(error)error(err);});
  }
  closeOrder(request:any,next:any=null,error:any=null,){
    this.api.postRequest("/Order/AddReport",request,data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  addSureStatus(request:any,next:any=null,error:any=null,){
    this.api.postRequest("/Order/AddSureStatus",request,data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getMyInvoices(next:any=null,error:any=null,){
    this.api.getRequest("/Order/Invoices","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getInvoicesDetails(OrderNo:number,next:any=null,error:any=null,){
    this.api.getRequest("/Order/InvoiceDetails/"+OrderNo,"",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  
  getTechOrderDetails(IDD:number,next:any=null,error:any=null,){
    this.api.getRequest("/Order/Tech/OrderDetails/"+IDD,"",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }


  getMoreOrders(dataLoader:any,state=null,from="",to="",eng_id=0,cst_id=0,next:any=null,error:any=null){
    this.api.postRequest("/order/Tech/MyOrders?state="+state+"&from="+from+"&to="+to+"&eng_id="+eng_id+"&cst_id="+cst_id,dataLoader,
    resp=>{
       
        dataLoader.draw++;
        dataLoader.start=dataLoader.length*dataLoader.draw;
        if(next)next(resp);
      
      },
      err=>{
        if(error)error(err);
      }
    );
  }
  getMyPreOrders(next:any=null,error:any=null){
    this.api.postRequest("/order/Tech/PreOrders",null,
    resp=>{
        if(next)next(resp);
      },
      err=>{
        if(error)error(err);
      }
    );
  }

  getOrderFinance(OrderNo:number,next:any=null,error:any=null,){
    this.api.getRequest("/Order/Finance/"+OrderNo,"",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getOrderStock(OrderNo:number,next:any=null,error:any=null,){
    this.api.getRequest("/Order/Stock/"+OrderNo,"",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getOrderServes(OrderNo:number,next:any=null,error:any=null,){
    this.api.getRequest("/Order/Serves/"+OrderNo,"",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }

  // getCurrentOrders(){
  //   return this.storage.get("currentOrders");
  // }
  // setCurrentOrders(value){
  //   return  this.storage.set("currentOrders",value);
  // }

  // {
  //   "Order_No": 15979,
  //   "Comp_ID": 27784,
  //   "Comp_No": 1,
  //   "Follow_ID":1,
  //   "OrderCase_ID": 1,
  //   "Notes": "sample string 6",
  //   "Customer_Report": "sample string 7",
  //   "Action_Date": "2019-04-19T17:09:36.5669854+02:00"
  // }

}
