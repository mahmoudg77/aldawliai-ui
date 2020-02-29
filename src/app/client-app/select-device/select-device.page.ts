import { apiError } from './../../services/dal/api-result';
import { LoadingService } from './../../services/loading.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-device',
  templateUrl: './select-device.page.html',
  styleUrls: ['./select-device.page.scss'],
})
export class SelectDevicePage implements OnInit {

  constructor(
    private auth:AuthService,
    private router:Router,
    private loading:LoadingService
    ) { }

  ngOnInit() {
    this.auth.checkLogin(
      next=>{
        this.loading.dismiss();
      },
      (error:apiError)=>{
        this.loading.dismiss();
        this.router.navigateByUrl("/home");
      })
  }

}
