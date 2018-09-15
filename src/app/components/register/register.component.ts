import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

import * as $ from 'jquery';


@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css'],
   providers: [UserService]
})
export class RegisterComponent implements OnInit {

   public accept: boolean;
   public user: User;
   public done: string;

   constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
   ) {
      this.accept = false;
      this.user = new User('', '', '', '', '', '', null, null);
   }

   ngOnInit() {

      $(document).ready(function () {
      });
   }

   onSubmit(form) {
      this._userService.register(this.user).subscribe(res => {
         if (res.user && res.user._id) {
            // console.log(res.user);
            this.done = 'yes';
            form.reset();
         } else {
            this.done = 'no';
         }
      }, err => {
         console.log(err);
         this.done = 'no';
      });
   }
}
