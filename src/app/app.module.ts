import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from './messages/messages.module';

import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditionComponent } from './components/user-edition/user-edition.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MomentModule } from 'angular2-moment';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

// Services
import { UserGuard } from './services/user.guard';
import { UserService } from './services/user.service';
// import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    UserEditionComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    MomentModule,
    MessagesModule
  ],
  providers: [
   appRoutingProviders,
   UserService,
   UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
