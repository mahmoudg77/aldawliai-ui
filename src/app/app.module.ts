import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ClientsService } from './services/clients.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { StockService } from './services/bll/stock.service';
import { LookupsService } from './services/bll/lookups.service';
import { CheckPageModule } from './check/check.module';
import { UserService } from './services/user.service';
import { ImageUploaderService } from './services/dal/image-uploader.service';
import { CallapiService } from './services/dal/callapi.service';
import { AuthService } from './services/auth/auth.service';
import { LoginUserModule } from './login-user/login-user.module';
import { LoginClientPageModule } from './login-client/login-client.module';
import { SharedService } from './services/shared.service';
import { LoadingService } from './services/loading.service';
import { HomePageModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientAppModule } from './client-app/client-app.module';
import { HttpClientModule } from '@angular/common/http';
import { OrdersService } from './services/bll/orders.service';
import { UserAppPageModule } from './user-app/user-app.module';
import { StockPipePipe } from './pipes/stock-pipe.pipe';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { AsyncPipe } from '@angular/common';
import { Market } from '@ionic-native/market/ngx';
// import { WebIntent } from '@ionic-native/web-intent/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
//import { Firebase } from '@ionic-native/firebase/ngx';
@NgModule({
  declarations: [AppComponent, StockPipePipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ClientAppModule,
    HomePageModule,
    LoginClientPageModule,
    LoginUserModule,
    HttpClientModule,
    CheckPageModule,
    UserAppPageModule,
    IonicStorageModule.forRoot(environment.database)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoadingService,
    SharedService,
    AuthService,
    CallapiService,
    ImageUploaderService,
    UserService,
    LookupsService,
    OrdersService,
    StockService,
    AsyncPipe,
    AppVersion,
    Market,
    ClientsService,
    InAppBrowser,
    // WebIntent,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    //Firebase

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
