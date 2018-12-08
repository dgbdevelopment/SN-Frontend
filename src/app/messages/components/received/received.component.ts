import { Component, OnInit } from '@angular/core';
// import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { Global } from '../../../services/global';

import * as $ from 'jquery';

@Component({
   selector: 'app-received',
   templateUrl: './received.component.html',
   styleUrls: ['./received.component.css'],
   providers: [UserService, MessageService]
})
export class ReceivedComponent implements OnInit {

   public title: string;
   public token: string;
   public received: Message[];
   public url: string;
   public page: number;
   public totalItems: number;
   public totalPages: number;

   constructor(
      private _userService: UserService,
      private _messageService: MessageService
   ) {
      this.title = 'Mensajes Recibidos';
      this.url = Global.url;
      this.page = 1;
   }

   ngOnInit() {
      this.token = this._userService.getToken();
      this.getReceived(this.token, this.page);
   }

   getReceived(token, page) {
      this._messageService.getReceived(token, page).subscribe(
         response => {
            if (response.messages) {
               if (this.page === 1) {
                  this.received = [];
                  this.received = response.messages;
               } else {
                  this.received = this.received.concat(response.messages);
               }
               this.totalItems = response.total;
               this.totalPages = response.pages;
            }
         },
         err => {
            console.log(<any>err);
         }
      );
   }

   moreViews() {
      this.page++;
      this.getReceived(this.token, this.page);
      $('html, body').animate({ scrollTop: $('body').prop('scrollHeight') }, 750);
   }

}
