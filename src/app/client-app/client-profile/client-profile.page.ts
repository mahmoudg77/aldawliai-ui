import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.page.html',
  styleUrls: ['./client-profile.page.scss'],
})
export class ClientProfilePage implements OnInit {
  data: any={};

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.checkLogin(next=>{
      this.data=next.account;
    });
  }

}
