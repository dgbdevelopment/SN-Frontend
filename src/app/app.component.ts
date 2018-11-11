import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
   providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
   public identifiedUser: User;

   constructor(
      private _userService: UserService
   ) { }

   ngOnInit() {
      this.getIdentified();
   }

   ngDoCheck() {

      if (this.identifiedUser) { return false; }
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

   change(Event) {
      this.identifiedUser = Event;
   }
}
