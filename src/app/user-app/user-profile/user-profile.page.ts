import { AuthService } from './../../services/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  data: any={};

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.checkLogin(next=>{
      this.data=next.account;
    });
  }

}
