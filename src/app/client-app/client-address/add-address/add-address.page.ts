import { LookupsService } from './../../../services/bll/lookups.service';
import { apiError } from './../../../services/dal/api-result';
import { ClientsService } from './../../../services/clients.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  form:FormGroup;
  address: any;
  Countries: any[]=[];
  Cities: any[]=[];
  constructor(private clients:ClientsService,private modal:ModalController,
    private lookup:LookupsService) {
    
    this.form=new FormGroup({
      CUNTRY_ID:new FormControl(null,Validators.required),
      CITY_ID:new FormControl(null,Validators.required),
      ADDRESS:new FormControl(null,Validators.required),
    });
  }
  cancel(){
    this.dismiss();
  }
  ngOnInit() {
     
    this.loadCountries();
   }
  loadCountries(): any {
    this.lookup.getCountries(
      next=>{
        this.Countries=next;
      }
    )
  }
  loadCities(country_id:number): any {
    this.lookup.getCities(country_id,
      next=>{
        this.Cities=next;
      }
    )
  }

  saveAddress(){
    this.address=this.form.getRawValue();
    this.clients.addNewAddress(this.address,
      next=>{
        this.modal.dismiss({
          isSuccess: true,
          data:next,
        });
      },
      (error:apiError)=>{
        alert(error.message);
      })
  }
  dismiss() {
    this.modal.dismiss({
      isSuccess: false,
    });
  }
  
}
