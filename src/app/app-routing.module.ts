import { LoginClientPage } from './login-client/login-client.page';
import { HomePage } from './home/home.page';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUserPage } from './login-user/login-user.component';
import { CheckPage } from './check/check.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'check',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component:HomePage
  },
  {
    path: 'check',
    component:CheckPage
  },
  {
    path: 'client',
    loadChildren: './client-app/client-app.module#ClientAppModule'
  },
  { path: 'user', loadChildren: './user-app/user-app.module#UserAppPageModule' },


  { path: 'login-client', component:LoginClientPage },
  { path: 'login-user', component:LoginUserPage },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },

  // { path: 'check', loadChildren: './check/check.module#CheckPageModule' },
  
  // {
  //   path: 'list',
  //   loadChildren: './list/list.module#ListPageModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
