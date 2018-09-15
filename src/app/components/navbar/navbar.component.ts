import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';


@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   @Input() IdentUser: User;
   @Output() IdentOutUser = new EventEmitter();

   public url: string;

   constructor(
      private _route: ActivatedRoute,
      private _router: Router,
   ) {
      this.url = Global.url;
    }

   ngOnInit() {
   }

   logOut() {
      localStorage.clear();
      this.IdentUser = null;
      this.IdentOutUser.emit(this.IdentUser);
      this._router.navigate(['/']);
   }
}
