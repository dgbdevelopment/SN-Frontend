import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MessagesRoutingModule } from './messages-routing.module';

import { MainComponent } from './components/main/main.component';
import { SendedComponent } from './components/sended/sended.component';
import { ReceivedComponent } from './components/received/received.component';
import { AddComponent } from './components/add/add.component';

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
      MessagesRoutingModule
   ],
   exports: [
      MainComponent,
      SendedComponent,
      ReceivedComponent,
      AddComponent
   ],
   providers: []
})
export class MessagesModule { }
