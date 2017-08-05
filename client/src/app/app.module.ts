import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToasterModule } from 'angular2-toaster';
import { RouterModule } from '@angular/router';
import { UsersModule} from './users/users.module';

import { AppComponent } from './app.component';

import { UsersService} from './users/users.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToasterModule,
    RouterModule,
    UsersModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
