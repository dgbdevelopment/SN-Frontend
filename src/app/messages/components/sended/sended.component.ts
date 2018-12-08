import { Component, OnInit } from '@angular/core';
// import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { Global } from '../../../services/global';

import * as $ from 'jquery';

@Component({
  selector: 'app-sended',
  templateUrl: './sended.component.html',
  styleUrls: ['./sended.component.css'],
  providers: [UserService, MessageService]
})
export class SendedComponent implements OnInit {

   public title: string;
   public token: string;
   public emitted: Message[];
   public url: string;
   public page: number;
   public totalItems: number;
   public totalPages: number;

   constructor(
      private _userService: UserService,
      private _messageService: MessageService
   ) {
      this.title = 'Mensajes Enviados';
      this.url = Global.url;
      this.page = 1;
   }

   ngOnInit() {
      this.token = this._userService.getToken();
      this.getEmitted(this.token, this.page);
   }

   getEmitted(token, page) {
      this._messageService.getEmitted(token, page).subscribe(
         response => {
            if (response.messages) {
               if (this.page === 1) {
                  this.emitted = [];
                  this.emitted = response.messages;
               } else {
                  this.emitted = this.emitted.concat(response.messages);
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
      this.getEmitted(this.token, this.page);
      $('html, body').animate({ scrollTop: $('body').prop('scrollHeight') }, 750);
   }

}
