import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {UsersService} from './users.service';
import {RouterModule} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import { UserCreateComponent } from './user-create/user-create.component';
import { HomeComponent } from '../home/home.component';
import { WelcomeComponent} from '../welcome/welcome.component';
import { UserLoginComponent } from './user-login/user-login.component';

const appRoutes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'users/register', component: UserCreateComponent},
  {path: 'users/login', component: UserLoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    UserCreateComponent,
    HomeComponent,
    WelcomeComponent,
    UserLoginComponent
  ],
  providers: [
    UsersService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [UserCreateComponent, HomeComponent, WelcomeComponent, UserLoginComponent]
})
export class UsersModule { }
