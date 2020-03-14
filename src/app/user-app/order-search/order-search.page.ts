import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.page.html',
  styleUrls: ['./order-search.page.scss'],
})
export class OrderSearchPage implements OnInit {
  data: any={
    state:1,
    date_from:'01/01/2019',
    date_to:'12/31/2019',
    eng_id:0
  };

  constructor(private route:Router,private auth:AuthService) { }

  ngOnInit() {
    this.auth.getUser().then(user=>{
      this.data.eng_id=user.account.ENG_ID;
    })
  }
  onSubmit(){
    this.data.state=1;
    this.route.navigate(['/','user','orders','search'],{
      queryParams: this.data,
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: true
      // do not trigger navigation
    });
  }
}
