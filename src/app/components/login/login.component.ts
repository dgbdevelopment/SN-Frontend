import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css'],
   providers: [UserService]
})
export class LoginComponent implements OnInit {

   public user: User;
   public done: string;
   // public userIdentified: User;
   public token: string;
   public errors: string;

   constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
   ) {
      this.user = new User('', '', '', '', '', '', null, null);
   }

   ngOnInit() {
   }

   onSubmit(form) {
      this.user.email = this.user.email.toLocaleLowerCase();
      this.user.nick = this.user.nick.toLocaleLowerCase();
      this.user.email = this.user.nick;
      this._userService.login(this.user, true).subscribe(res => {
         if (res.user && res.user._id) {
            // this.userIdentified = res.user;
            this.token = res.token;
            this.done = 'yes';
            // localStorage.setItem('userIdentified', JSON.stringify(this.userIdentified));
            localStorage.setItem('token', this.token);
            this._userService.getCounters().subscribe(resp => {
               localStorage.setItem('stats', JSON.stringify(resp));
            });
            this._router.navigate(['/']);
         } else {
            this.done = 'no';
         }
      }, err => {
         this.errors = (err.error.message);
         this.done = 'no';
      });
   }
}
