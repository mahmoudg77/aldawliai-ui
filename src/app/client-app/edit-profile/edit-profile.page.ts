import { OrdersService } from 'src/app/services/bll/orders.service';
import { LookupsService } from './../../services/bll/lookups.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { apiError } from 'src/app/services/dal/api-result';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  form:FormGroup;
  profileData:any={};
  Countries: any;
  Cities: any;
  forOrder=0;
  // selected_device:number;
  // selected_mark:number;
  // selected_code:number;
  phone:string="";
  constructor(public auth:AuthService,
              private loader:LoadingService,
              private router:Router,
              private formBuilder:FormBuilder,
              private lookup:LookupsService,
              private route:ActivatedRoute,
              private order:OrdersService) { 
                this.form=new FormGroup({
                    NAME:new FormControl('',[Validators.required,Validators.minLength(10)]),
                    // CUNTRY_ID:new FormControl(null,Validators.required),
                    // CITY_ID:new FormControl(null,Validators.required),
                    // ADDRESS:new FormControl(null,Validators.required),
                    TEL1:new FormControl('',[Validators.minLength(7),Validators.maxLength(8)]),
                    MOBIL:new FormControl('',[Validators.minLength(11),Validators.maxLength(13)]),
                    MOBIL1:new FormControl('',[Validators.minLength(11),Validators.maxLength(13)]),
                    MOBIL2:new FormControl('',[Validators.minLength(11),Validators.maxLength(13)]),
                    HOT_LINE:new FormControl('',[Validators.minLength(4),Validators.maxLength(6)]),
                   // CUS_ID:new FormControl(),

                  })
              }

  ngOnInit() {

    this.auth.checkLogin(next=>{
      // this.auth.getUser().then(next=>{
        if(!next){
          this.profileData={};
        }else{
          this.profileData=next.account;
          this.phone=next.phone;

        }
        
      // });
    })
    // if(this.auth.getUser()==null){
    //   this.profileData={};
    // }
    this.loadCountries();
    // this.route.queryParams.subscribe(params=>{
    //   this.selected_device=+params['device'];
    //   this.selected_mark=+params['mark'];
    //   this.selected_code=+params['code'];
    // })
    // this.selected_device=this.order.newOrder.DeviceTypeID;
    // this.selected_mark=this.order.newOrder.MarkID;
    // this.selected_code=this.order.newOrder.DeviceCode;
    this.route.queryParams.subscribe(params=>{
      this.forOrder=+params['fororder'];
    });

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


  cancel(){
    this.router.navigateByUrl("/client/home")
  }

  saveProfile(){

    //this.profileData=this.form.getRawValue();
    this.auth.saveMyProfile(this.profileData,
      next=>{
        // this.auth.setUser(next);
        // if(this.selected_device>0){
        //   this.router.navigateByUrl("/client/new-order?device="+this.selected_device+"&mark="+this.selected_mark+"&code="+this.selected_code);
        // }else{
        //   this.router.navigateByUrl("/client/select-device");
        // }
        if(this.forOrder>0)
          this.router.navigateByUrl("/client/address");
        else 
          this.router.navigateByUrl("/client/profile");

      },
      (error:apiError)=>{
        //alert(error.message);
      })
  }
}
