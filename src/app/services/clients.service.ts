import { CallapiService } from './dal/callapi.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private api:CallapiService) { }


  addNewAddress(address:any,next:any=null,error:any=null){
    this.api.postRequest("/Address/Create",address,data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getMyAddress(next:any=null,error:any=null){
    this.api.getRequest("/Address/All","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
 
}
