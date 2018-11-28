import { Component, OnInit, DoCheck } from '@angular/core';
import { Follow } from '../../../models/follow';
import { Message } from '../../../models/message';
import { User } from '../../../models/user';
import { FollowService } from '../../../services/follow.service';
import { UserService } from '../../../services/user.service';
import { MessageService } from '../../../services/message.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../../services/global';


@Component({
   selector: 'app-add',
   templateUrl: './add.component.html',
   styleUrls: ['./add.component.css'],
   providers: [FollowService, MessageService, UserService]
})
export class AddComponent implements OnInit, DoCheck {

   public title: string;
   public message: Message;
   public token: String;
   public url: string;
   public identifiedUser: User;
   public users;
   public status: string;

   constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _followService: FollowService,
      private _messageService: MessageService,
      private _userService: UserService
   ) {
      this.title = 'Enviar mensaje';
      this.url = Global.url;

      this.token = this._userService.getToken();

      this.message = new Message('', '', '', '', '', null);
   }

   ngOnInit() {
      this.getIdentified();
      this.getAllUsers();
   }

   ngDoCheck() {
      if (this.identifiedUser !== undefined && localStorage.getItem('token')) { return false; }
      this.getIdentified();
   }

   getIdentified() {
      this._userService.getIdentifiedUser().subscribe(
         res => {
            if (res.user) {
               this.identifiedUser = res.user;
            } else {
               this.identifiedUser = null;
            }
         }, err => {
            this.identifiedUser = null;
         });
   }

   getAllUsers() {
      this._userService.getAllUsers().subscribe(
         response => {
            this.users = response.users;
         },
         err => {
            console.log(<any>err);
         }
      );
   }

   onSubmit(form){
      this.message.emitter = this.identifiedUser._id;
      // console.log(this.message);
      this._messageService.addMessage(this.token, this.message).subscribe(response => {
         this.status = 'done';
      }, error => {
         this.status = 'fail';
      });
   }

}
