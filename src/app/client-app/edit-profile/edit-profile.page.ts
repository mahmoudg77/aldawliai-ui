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
  profileData:any;
  Countries: any;
  Cities: any;
  selected_device:number;
  selected_mark:number;
  selected_code:number;

  constructor(public auth:AuthService,
              private loader:LoadingService,
              private router:Router,
              private formBuilder:FormBuilder,
              private lookup:LookupsService,
              private route:ActivatedRoute) { 
                this.form=new FormGroup({
                    NAME:new FormControl(null,[Validators.required,Validators.minLength(10)]),
                    CUNTRY_ID:new FormControl(null,Validators.required),
                    CITY_ID:new FormControl(null,Validators.required),
                    ADDRESS:new FormControl(null,Validators.required),
                    TEL1:new FormControl(null,[Validators.minLength(7),Validators.maxLength(8)]),
                    MOBIL1:new FormControl(null,[Validators.minLength(11),Validators.maxLength(13)]),

                  })
              }

  ngOnInit() {
    this.auth.getUser().then(next=>{
      if(!next){
        this.profileData={};
      }else{
        this.profileData=next;
      }

    });
    // if(this.auth.getUser()==null){
    //   this.profileData={};
    // }
    this.loadCountries();
    this.route.queryParams.subscribe(params=>{
      this.selected_device=+params['device'];
      this.selected_mark=+params['mark'];
      this.selected_code=+params['code'];
    })
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
    this.profileData=this.form.getRawValue();
    this.auth.saveMyProfile(this.profileData,
      next=>{
        this.auth.setUser(next);
        if(this.selected_device>0){
          this.router.navigateByUrl("/client/new-order?device="+this.selected_device+"&mark="+this.selected_mark+"&code="+this.selected_code);
        }else{
          this.router.navigateByUrl("/client/select-device");
        }
      },
      (error:apiError)=>{
        alert(error.message);
      })
  }
}
