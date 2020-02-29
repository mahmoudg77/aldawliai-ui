import { AddAddressPage } from './add-address/add-address.page';
import { ListAddressPage } from './list-address/list-address.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    redirectTo:'list',
  },
  {
    path:'list',
    component:ListAddressPage
  },
  {
    path:'add',
    component:AddAddressPage
  },
  {
    path:'**',
    pathMatch:'full',
    redirectTo:'list',
  },


];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations:[
    ListAddressPage,
    AddAddressPage
  ]
})
export class ClientAddressModule { }
