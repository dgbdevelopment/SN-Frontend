import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { MessagesRoutingModule } from './messages-routing.module';

import { MainComponent } from './components/main/main.component';
import { SendedComponent } from './components/sended/sended.component';
import { ReceivedComponent } from './components/received/received.component';
import { AddComponent } from './components/add/add.component';
import { UserGuard } from '../services/user.guard';
import { UserService } from '../services/user.service';


@NgModule({
   declarations: [
      MainComponent,
      SendedComponent,
      ReceivedComponent,
      AddComponent
   ],
   imports: [
      CommonModule,
      FormsModule,
      MessagesRoutingModule,
      MomentModule
   ],
   exports: [
      MainComponent,
      SendedComponent,
      ReceivedComponent,
      AddComponent
   ],
   providers: [UserGuard, UserService]
})
export class MessagesModule { }
