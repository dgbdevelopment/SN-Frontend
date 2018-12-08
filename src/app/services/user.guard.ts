import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class UserGuard implements CanActivate {

   constructor(
      private _router: Router
   ) {

   }

   canActivate() {
      const role = localStorage.getItem('role');
      console.log(role);

      if (role && role === 'Standard') {
         return true;
      } else {
         this._router.navigate(['/login']);
         return false;
      }
   }
}
