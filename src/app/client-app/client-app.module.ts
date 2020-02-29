// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NewOrderPageModule } from './new-order/new-order.module';
import { EditProfilePageModule } from './edit-profile/edit-profile.module';
import { AppComponent } from './../app.component';
import { ClientHomeComponent } from './client-home/client-home.component';
 // Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ClientAppComponent } from './client-app.component';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientHomeModule } from './client-home/client-home.module';

const routes: Routes = [
   
    {
      path:'',
      component:ClientAppComponent,
      children:[
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
        {
          path: 'home',
          component:ClientHomeComponent
        },
        { path: 'my-orders', loadChildren: './my-orders/my-orders.module#MyOrdersPageModule' },
        { path: 'new-order', loadChildren: './new-order/new-order.module#NewOrderPageModule' },
        { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
        { path: 'select-device', loadChildren: './select-device/select-device.module#SelectDevicePageModule' },
        { path: 'order-success', loadChildren: './order-success/order-success.module#OrderSuccessPageModule' },
        { path: 'website', loadChildren: './website/website.module#WebsitePageModule' },
        { path: 'order-details', loadChildren: './order-details/order-details.module#OrderDetailsPageModule' },
        { path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesPageModule' },
        { path: 'invoice-details', loadChildren: './invoice-details/invoice-details.module#InvoiceDetailsPageModule' },
        { path: 'profile', loadChildren: './client-profile/client-profile.module#ClientProfilePageModule' },
        { path: 'address', loadChildren: './client-address/client-address.module#ClientAddressModule' },
      ]
    },


    
    // {
    //   path: 'list',
    //   loadChildren: './../list/list.module#ListPageModule'
    // }
  ];
@NgModule({
    imports: [
        CommonModule, 
        IonicModule.forRoot(),
        RouterModule.forChild(routes),
        ClientHomeModule,
        NewOrderPageModule,
        EditProfilePageModule,
        
    ],
    declarations: [
      ClientAppComponent,
       
    ],
    providers:[
      // InAppBrowser
    ],
    exports: [
      ClientAppComponent,

    ]
})
export class ClientAppModule {

}
