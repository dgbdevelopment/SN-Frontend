import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
   providers: [UserService]
})
export class HomeComponent implements OnInit, DoCheck {

   public identifiedUser: User;

   constructor(
      private _userService: UserService
   ) { }

   ngOnInit() {
      this.getIdentified();
   }

   ngDoCheck() {
      if (this.identifiedUser !== undefined && localStorage.getItem('token')) { return false; }
      this.getIdentified();
   }

   getIdentified() {
      this._userService.getIdentifiedUser().subscribe(res => {
         if (res.user) {
            this.identifiedUser = res.user;
            // console.log(this.identifiedUser);
         } else {
            this.identifiedUser = null;
         }
      }, err => {
         this.identifiedUser = null;
      });
   }
}
