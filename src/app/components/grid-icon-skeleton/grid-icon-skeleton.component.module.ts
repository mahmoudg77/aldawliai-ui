import { GridIconSkeletonComponent } from './grid-icon-skeleton.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  declarations: [
    GridIconSkeletonComponent

  ],
  exports:[
    GridIconSkeletonComponent
  ]
})
export class GridIconSkeletonComponentModule {}
