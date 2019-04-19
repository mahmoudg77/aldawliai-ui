import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { OrderHistoryPage } from './order-history.page';


const routes: Routes = [
  {
    path: 'history',
    children:
    [
      
      {
        path: ':id',
        component:OrderHistoryPage
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderHistoryPage]
})
export class OrderHistoryPageModule {}
